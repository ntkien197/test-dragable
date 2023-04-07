<template>
    <div class="about">
        <h1>This is an about page</h1>
        <p>{{ data?? '' }}</p>
        <div v-if="data">
            <template v-for="(i,index) in data">
                <div :key="i.id" >
                    <template v-if="i.name == 'Button'">
                        <button>
                            <span>
                                {{ i.props.message || i.name }}
                            </span>
                        </button>
                    </template>
                    <template v-if="i.name == 'Paragraph'">
                        <span>
                            {{ i.props.message || i.name }}
                        </span>
                    </template>

                </div>
            </template>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Client',
    data() {
        return {}
    },
    methods: {},
    mounted() {

    },
    computed: {
        ...mapGetters({
                data: 'client/getTest'
            }
        )
    }
}
</script>
<style scoped lang="scss">

</style>
