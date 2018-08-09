<template>

    <component :is="type"
               :href="href"
               class="button"
               :class="[variant]"
               v-on="$listeners">
        <slot></slot>
    </component>
</template>

<script>
    export default {
        name: 'my-button',
        computed: {
            type() {
                if (this.href) {
                    return 'a';
                }
                return 'button';
            }
        },
        props: {
            variant: {
                type: String,
                default: 'primary'
            },
            href: {
                required: false
            }
        }
    };
</script>

<style lang="scss" scoped>


    // KPN colors
    $color-green-10: #f4fae3;
    $color-green-30: #cd7;
    $color-green-50: #9c0;
    $color-green-70: #090;
    $color-green-90: #070;

    $color-blue-20: #dbecf9;
    $color-blue-30: #0af;
    $color-blue-40: #9cf;
    $color-blue-60: #09f;
    $color-blue-80: #07c;
    $color-blue-90: #059;

    // Orange is meant for alerts. This color should be used carefully.
    $color-orange-20: #feeacc;
    $color-orange-40: #fb5;
    $color-orange-60: #f90;
    $color-orange-80: #e70;

    // The grays are mainly used for the texts and UI-elements
    $color-gray-00: #fff;
    $color-gray-10: #f3f3f3;
    $color-gray-20: #e3e3e3;
    $color-gray-30: #d3d3d3;
    $color-gray-40: #b3b3b3;
    $color-gray-50: #939393;
    $color-gray-60: #737373;
    $color-gray-70: #535353;
    $color-gray-80: #333;

    // Reds are only used for error related notifications.
    $color-red-50: #f33;
    $color-red-70: #e52e2e;

    .button {
      background-color: $color-blue-60;
      border-radius: 30px;
      border: none;
      color: $color-gray-00;
      font-size: 16px;
      line-height: 1;
      min-width: 100px;
      overflow: hidden;
      padding: 14px 26px;
      transition: background-color 0.2s ease-in-out;
      white-space: nowrap;

      &:disabled {
        background-color: $color-gray-40;

        &:hover {
          background-color: $color-gray-40;
          cursor: not-allowed;
        }
      }

      &:focus,
      &:hover {
        background-color: $color-blue-80;
        cursor: pointer;
      }
    }

    button.secondary {
      background-color: $color-gray-00;
      border: 1px solid $color-blue-60;
      color: $color-blue-60;

      &:disabled {
        background-color: $color-gray-00;
        border-color: $color-gray-40;
        color: $color-gray-40;

        &:hover {
          background-color: $color-gray-00;
          border-color: $color-gray-40;
          color: $color-gray-40;
          cursor: not-allowed;
        }
      }

      &:focus,
      &:hover {
        background-color: $color-blue-80;
        border-color: $color-blue-80;
        color: $color-gray-00;
        cursor: pointer;
      }
    }
</style>
