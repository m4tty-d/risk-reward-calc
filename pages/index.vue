<template lang="pug">
.h-screen.flex.justify-center.items-center.bg-darkerBlue
  .container.mx-auto.max-w-xl.bg-white.rounded-lg.px-6.py-5.bg-blueGray.custom-box-shadow
    h1.text-center.mb-8
      .text-xl.text-white Kite's
      .text-4xl.font-black.text-transparent.bg-clip-text.bg-gradient-to-br.from-blue-300.to-yellow-500 Risk Reward Calculator
    .mb-4
      base-label Portfolio size
      base-input(prefix="$" type="number" v-model.number="portfolioSize")
    .mb-4
      base-label Margin size
      base-input(prefix="%" type="number" v-model.number="marginPercent" tooltip="The amount which you will be exposing in this trade.")
      base-input(prefix="$" type="number" v-model.number="margin")
    .mb-4
      base-label Risk
      base-input(prefix="%" type="number" v-model.number="riskPercent" tooltip="The amount which you are willing to loose from the margin.")
      base-input(prefix="$" type="number" v-model.number="risk")
    .mb-4
      base-label Stop loss
      base-input(prefix="%" v-model.number="stopLossPercentage" tooltip="The stop loss percentage from the long/short chart tool in TV.")
    .flex.mt-8
      .mb-4.text-white(class="w-1/3")
        .text-center.text-xs.text-gray-500 Portfolio at risk
        .h-8.flex.justify-center.items-center.font-mono {{ getPortfolioRiskPercent() }}%
      .text-white(class="w-1/3")
        .text-center.text-xs Leverage to use
        .h-11.flex.justify-center.items-center.text-3xl.font-black.font-mono {{ getLeverage() }}
      .mb-4.text-white(class="w-1/3")
        .text-center.text-xs.text-gray-500 Contracts to use
        .h-8.flex.justify-center.items-center.font-mono {{ margin * getLeverage() }}
</template>

<script>
import { formatNumber } from '@/utils'

export default {
  data() {
    return {
      portfolioSize: 0,
      margin: 0,
      marginPercent: 8,
      risk: 0,
      riskPercent: 25,
      stopLossPercentage: 2,
    }
  },

  watch: {
    portfolioSize(v) {
      if (v) {
        this.calculateMargin()
        this.calculateRisk()
      }
    },
    margin(v) {
      if (!v) {
        this.marginPercent = ''
      } else {
        this.calculateMarginPercent()
      }
    },
    marginPercent(v) {
      if (!v) {
        this.margin = ''
      } else {
        this.calculateMargin()
        this.calculateRisk()
      }
    },

    risk(v) {
      if (!v) {
        this.riskPercent = ''
      } else {
        this.calculateRiskPercent()
      }
    },
    riskPercent(v) {
      if (!v) {
        this.risk = ''
      } else {
        this.calculateRisk()
      }
    },
  },

  methods: {
    calculateMargin() {
      this.margin = this.portfolioSize * (this.marginPercent / 100)
    },
    calculateMarginPercent() {
      this.marginPercent = (this.margin / this.portfolioSize) * 100
    },
    calculateRisk() {
      this.risk = this.margin * (this.riskPercent / 100)
    },
    calculateRiskPercent() {
      this.riskPercent = (this.risk / this.margin) * 100
    },
    getLeverage() {
      return !this.stopLossPercentage
        ? 0
        : Math.round((this.riskPercent / 100 / this.stopLossPercentage) * 100)
    },
    getPortfolioRiskPercent() {
      return this.portfolioSize
        ? formatNumber((this.risk / this.portfolioSize) * 100)
        : 0
    },
    getRiskType() {
      const percent = this.getPortfolioRiskPercent()

      if (percent <= 5) {
        return 'Good'
      } else if (percent > 5 && percent <= 10) {
        return 'Risky'
      } else {
        return 'Dangerous'
      }
    },
  },
}
</script>

<style lang="sass">
.v-popover
  & > .trigger
    display: block !important

.tooltip
  display: block !important
  z-index: 10000

  .tooltip-inner
    margin-left: 16px
    background: black
    color: white
    border-radius: 0.375rem
    font-size: 12px
    height: 38px
    display: flex
    align-items: center
    padding: 0 20px
    opacity: 0.6

  &[aria-hidden='true']
    visibility: hidden
    opacity: 0
    transition: opacity .3s, visibility .3s

  &[aria-hidden='false']
    visibility: visible
    opacity: 1
    transition: opacity .3s

.custom-box-shadow
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(39 176 230 / 29%) 0px 0px 300px -52px
</style>
