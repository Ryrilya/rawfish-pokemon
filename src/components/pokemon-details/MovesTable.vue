<template>
  <div class="moves-table">
    <h4 class="moves-table__title">{{ tableLable }}</h4>

    <table class="moves-table__table">
      <thead class="moves-table__table-head">
        <tr>
          <th v-if="variant === 'level-up'">Level</th>
          <th v-else-if="variant === 'tm'">TM</th>
          <th v-else-if="variant === 'tr'">TR</th>
          <th>Move</th>
          <th>Type</th>
          <th>Category</th>
          <th>Power</th>
          <th>Accuracy</th>
        </tr>
      </thead>
      <tbody class="moves-table__table-body">
        <tr class="moves-table__move" v-for="move in tableMoves" :key="move.id">
          <td class="moves-table__move-lvl" v-if="move.lvl">{{ move.lvl }}</td>
          <td class="moves-table__move-tm" v-if="move.tmNum">{{ move.tmNum }}</td>
          <td class="moves-table__move-tr" v-if="move.trNum">{{ move.trNum }}</td>

          <td class="moves-table__move-name">{{ move.name }}</td>
          <td class="moves-table__move-type">
            <div class="app__type-pill" :class="`app__type-pill--${move.type}`">
              {{ move.type }}
              <img class="app__type-pill-icon" :src="loadTypeImg(move.type)" :alt="`${move.type} icon`">
            </div>
          </td>
          <td class="moves-table__move-category">
            {{ move.category }}
          </td>
          <td class="moves-table__move-power">{{ move.power ? move.power : '/' }}</td>
          <td class="moves-table__move-accuracy">{{  move.accuracy ? move.accuracy : '/' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Move } from '@/models/Move';
import { MoveSource } from '@/models/Pokemon';
import { MoveRecord } from '@/models/class/MoveRecord';
import { Machine } from '@/models/Machine';
import { defineComponent, ref, onMounted, inject } from 'vue';

interface IMoveRecord {
  accuracy: number;
  power: number;
  category: string;
  name: string;
  type: string;
  lvl?: number;
  tmNum?: number;
  trNum?: number;
}

export default defineComponent({
  props: {
    tableLable: {
      type: String,
      required: true,
    },
    moves: {
      type: Object,
      required: true,
    },
    variant: {
      type: String,
      required: false,
      default: 'default'
    }
  },
  setup(props){
    const moves = props.moves as MoveSource[];
    const tableMoves = ref<IMoveRecord[]>([]);
    const typeIconsFolder = inject<(path: string) => string>('typeIconsFolder');

    console.dir(tableMoves.value);
    
    onMounted(() => {
      moves.forEach(async (moveSrc) => {
        const moveDetails = await getMoveDetails(moveSrc.move.url);

        let tableMove = new MoveRecord(0, 0, '', '', '');
        tableMove.accuracy = moveDetails.accuracy;
        tableMove.power = moveDetails.power;
        tableMove.category = moveDetails.damage_class.name;
        tableMove.name = moveDetails.name.replace('-', ' ');
        tableMove.type = moveDetails.type.name;

        switch(moveSrc.version_group_details[0].move_learn_method.name) {
          case 'level-up':
            tableMove.lvl = moveSrc.version_group_details[0].level_learned_at;
            break;

          case 'machine':
            tableMove.tmNum = await getMachineNum(moveDetails.machines[0].machine.url);
            break;
        }

        tableMoves.value.push(tableMove);
      });

      tableMoves.value.sort((current, next) => current.name.localeCompare(next.name));
    });

    async function getMoveDetails(moveUrl: string) {
      const data = await fetch(moveUrl);
      return await data.json() as Move;
    }

    async function getMachineNum(machineUrl: string) {
      const data = await fetch(machineUrl);
      const machine = await data.json() as Machine;

      return parseInt(machine.item.name.substring(2));
    }
    const loadTypeImg = (type: string) => typeIconsFolder ? typeIconsFolder(`./${type}.svg`) : '';


    return {
      tableMoves,
      loadTypeImg
    };
  },
});
</script>

<style lang="scss" scoped>
.moves-table {
  width: 100%;

  &__title {
    font-size: 1.3rem;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 0.5rem;

    thead tr th,
    tbody tr td {
      text-align: left;
      padding: 0.5rem 0.8rem;
    }

    thead tr th {
      background-color: hsl(0, 0%, 95%);
      color: hsl(0, 0%, 60%);
      font-weight: 500;

      &:first-child {
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
      }

      &:last-child {
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
      }
    }

    tbody {
      td {
        &.moves-table__move-lvl,
        &.moves-table__move-tm,
        &.moves-table__move-tr {
          text-align: right;
        }


        &.moves-table__move-name,
        &.moves-table__move-category  {
          text-transform: capitalize;
        }

        &.moves-table__move-name {
          font-weight: bold;
        }

        &.moves-table__move-type {
          width: auto;
        }
      }
    }
  }
}
</style>