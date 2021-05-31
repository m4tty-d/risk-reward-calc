<template lang="pug">
v-popover.block(:disabled="!tooltip" :placement="tooltipPlacement()" :offset="offset()")
  label.block.text-sm.font-medium.text-gray-700(:for='id') {{ label }}
  .mt-1.relative.rounded-md.shadow-sm
    .absolute.inset-y-0.left-0.pl-3.flex.items-center.pointer-events-none(v-if="prefix")
      span.text-gray-500.text-md {{ prefix }}
    input(:id="id"
          :type='type'
          :class="classes"
          class="font-mono bg-darkBlue text-lg text-white block w-full border-none rounded-md focus:ring-yellow-500"
          :placeholder='placeholder'
          :value="type === 'number' ? formatNumber(value) : value"
          @input="$emit('input', $event.target.value)")
    .absolute.inset-y-0.right-0.flex.items-center(v-if="postfix")
      span.text-gray-500.text-md {{ postfix }}
  template(slot="popover") {{ tooltip }}
</template>

<script>
import { formatNumber } from '@/utils'

let uuid = 0

export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: null,
    },
    prefix: {
      type: String,
      default: null,
    },
    postfix: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    tooltip: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      windowWidth: 0,
    }
  },

  computed: {
    id() {
      return `input-${this.uuid}`
    },
    classes() {
      return [this.prefix ? 'pl-9' : 'pl-3', this.postfix ? 'pr-7' : '']
    },
  },

  beforeCreate() {
    this.uuid = uuid.toString()
    uuid++
  },

  mounted() {
    this.setWidth()
    window.addEventListener('resize', this.setWidth)
    window.addEventListener('orientationchange', this.setWidth)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.setWidth)
    window.removeEventListener('orientationchange', this.setWidth)
  },

  methods: {
    formatNumber,
    setWidth() {
      this.windowWidth = window.innerWidth
    },
    tooltipPlacement() {
      return this.windowWidth < 1240 ? 'top' : 'right'
    },
    offset() {
      return this.windowWidth < 1240 ? 10 : 0
    },
  },
}
</script>
