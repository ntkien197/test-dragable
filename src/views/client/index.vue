<template>
    <div class="main-content">
        <h1 style="margin-bottom: 20px">This is Consumer</h1>
        <div v-if="listData && listData.length">
            <div v-for="(item,index) in listData" :key="item.id" @click="handleClickButton(item)">
                <template v-if="item.code == 'button'">
                    <button style="margin-bottom: 20px">
                        <span>
                            {{ item.props.message || item.name }}
                        </span>
                    </button>
                </template>
                <template v-if="item.code == 'paragraph'">
                    <span style="margin-bottom: 20px">
                        {{ item.props.message || item.name }}
                    </span>
                </template>
                <div v-if="item.code == 'editor'" style="margin-bottom: 20px" v-html="item.props.message"></div>
                <template v-if="item.code == 'image'">
                    <div v-if="item.props.previewImage" style="width: 100px;height: 100px;margin: auto;margin-bottom: 20px">
                        <img style="width: 100%;height: 100%;" :src="item.props.previewImage" alt="" />
                    </div>
                </template>
            </div>
            <div style="margin-top: 40px">
                <span>Go to admin config <router-link style="text-decoration: underline" :to="{name:'admin'}">here</router-link></span>

            </div>
        </div>
        <div v-else>
            No data, please config data
            <router-link style="text-decoration: underline" :to="{name: 'admin'}">here</router-link>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Client',
    metaInfo() {
        return {
            title: 'Consumer'
        }
    },
    data() {
        return {
            listData: []
        }
    },
    methods: {
        handleClickButton(item) {
            if (item.code == 'button') {
                if (!item.props.alert) return alert('Không có thông báo nào được nhập vào')
                return alert(item.props.alert)
            }
        }
    },
    mounted() {
        if (this.getData && this.getData.length) {
            this.listData = JSON.parse(this.getData)
        }
    },
    computed: {
        ...mapGetters({
                getData: 'client/getTest'
            }
        )
    }
}
</script>
<style scoped lang="scss">
.main-content {
    text-align: center;
}
</style>
