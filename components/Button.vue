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
    @import "../../../styles/base/config";
    @import "../../../styles/base/mixins";

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
