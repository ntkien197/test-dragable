<template>
    <div class="main-content">
        <h1 style="margin-bottom: 20px">This is Consumer</h1>
        <div v-if="listData && listData.length">
            <div v-for="(item,index) in listData" :key="item.id" @click="handleClickButton(item)">
                <template v-if="item.code == 'button'">
                    <button>
                        <span>
                            {{ item.props.message || item.name }}
                        </span>
                    </button>
                </template>
                <template v-if="item.code == 'paragraph'">
                    <span>
                        {{ item.props.message || item.name }}
                    </span>
                </template>
            </div>
        </div>
        <div v-else>
            Không có dữ liệu, vui lòng cấu hình dữ liệu tại
            <router-link :to="{name: 'admin'}">đây</router-link>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Client',
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
