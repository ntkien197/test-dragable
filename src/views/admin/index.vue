<template>
    <div class="container">
        <div class="header">
            <ul>
                <li>
                    <div @click="handleSave" class="header-btn">Save</div>
                </li>
                <li>
                    <div @click="onUndo" class="header-btn">Undo</div>
                </li>
                <li>
                    <div @click="onRedo" class="header-btn">Redo</div>
                </li>
                <li>
                    <div class="header-btn">Export</div>
                </li>
                <li>
                    <div @click="onImport" class="header-btn">Import</div>
                </li>
                <li>
                    <div class="header-btn">
                        <router-link :to="{name:'consumer'}">View</router-link>
                    </div>
                </li>
            </ul>
        </div>
        <div class="main">
            <div class="main-sidebar">
                <draggable
                    class="dragArea list-group"
                    :list="list1"
                    :group="{ name: 'people', pull: 'clone', put: false }"
                    :sort="false"
                    @start="onStartDrag"
                >
                    <div
                        class="list-group-item"
                        v-for="element in list1"
                        :key="element.code"
                    >
                        {{ element.name }}
                    </div>
                </draggable>
            </div>
            <div class="main-body">
                <div class="main-body_content">
                    <div class="">
                        <p>Mouse: ({{ mouseCoor.xAxis }} ,{{ mouseCoor.yAxis }})</p>
                        <p>Dragging: {{ dragging.component }}</p>
                        <p>Instance: {{ list2.length }}</p>
                        <p>Config: {{ currentItem || '' }}</p>
                    </div>
                    <draggable draggable=".item"
                               class="dragArea list-group"
                               :list="list2"
                               group="people"
                               :sort="false"
                               @change="log"
                    >
                        <template v-for="(i,index) in list2">
                            <div :key="i.id" @click="onSelectedElement(i, index)">
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
                    </draggable>
                </div>
                <div v-if="currentItem" class="main-body_input">
                    <div v-if="currentItem.name == 'Paragraph'">
                        <label>Message</label>
                        <input v-model="list2[currentIndex].props.message" type="text">
                    </div>
                    <div v-if="currentItem.name == 'Button'">
                        <label>Nội dung</label>
                        <input v-model="list2[currentIndex].props.name" type="text">
                        <label>Message</label>
                        <input v-model="list2[currentIndex].props.message" type="text">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable'

export default {
    name: 'AdminView',
    components: {
        draggable
    },
    data() {
        return {
            list1: [
                {
                    name: 'Paragraph',
                    component: 'ElementParagraph',
                    props: { message: '' }
                },
                {
                    name: 'Button',
                    component: 'ElementButton',
                    props: { alert: '', message: '' }
                }
            ],
            list2: [],
            cloneList: [],
            mouseCoor: { xAxis: 0, yAxis: 0 },
            dragging: {},
            currentItem: {},
            currentIndex: null,
            historyList2: {},
            step: 0
        }
    },
    methods: {
        onSelectedElement(element, index) {
            this.currentIndex = index
            this.currentItem = element
        },
        onStartDrag($evt) {
            const temp = $evt.item
            const { _underlying_vm_ } = temp
            this.dragging = _underlying_vm_
        },
        log(evt) {
            this.step++
            this.historyList2[`step-${this.step}`] = [...this.list2]
        },
        onUndo() {
            if (!this.list2 || !this.list2.length) return alert('Nothing to undo')
            let prevHistory = this.historyList2[`step-${this.step - 1}`]

            if (prevHistory && prevHistory.length) {
                this.currentItem = {}
                this.currentIndex = null
                this.step--
                return this.list2 = prevHistory
            }

            return this.list2 = []
        },
        onRedo() {
            // if (!this.list2 || !this.list2.length) return alert('Nothing to redo')
            let nextHistory = this.historyList2[`step-${this.step + 1}`]

            if (nextHistory && nextHistory.length) {
                this.currentItem = {}
                this.currentIndex = null
                this.step++
                return this.list2 = nextHistory
            }
        },
        handleSave() {
            if(!this.list2.length) return alert('Không có dữ liệu để lưu')
            let data = this.list2
            this.$store.dispatch('client/test',data)
            alert('Lưu thành công')
        },
        onImport() {
            this.currentIndex = null
            this.currentItem = null
            const jsonString = prompt('Chỉ chấp nhận JSON: ')
            console.log(jsonString)
            try {
                const check = JSON.parse(JSON.parse(jsonString))
                console.log(typeof check)
                if (check && typeof check === 'object')
                    return this.list2 = JSON.parse(JSON.parse(jsonString))
            } catch (e) {
                alert('Not valid JSON')
            }
        }
    },
    watch: {
        list2(newVal, oldVal) {
            if (newVal && newVal.length) {
                this.dragging = {}
                const index = newVal.length - 1

                const randomId = Math.random()

                const temp = JSON.parse(JSON.stringify(newVal[index]))

                temp.id = `id-${randomId}`

                return this.list2[index] = temp
            }
        }
    },
    mounted() {
        document.addEventListener('mousemove', evt => {
            const { clientX, clientY } = evt
            return this.mouseCoor = { xAxis: clientX, yAxis: clientY }
        })
    }
}
</script>

<style scoped lang="scss">
.container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.header {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #2c3e50;
    padding: 10px;

    &-btn {
        background: red;
        color: #fff;
        padding: 5px 10px;
        cursor: pointer;
    }
}

.main {
    display: flex;
    flex: 1;

    &-sidebar {
        width: 20%;
        border-right: 1px solid #2c3e50;
        padding: 10px;
    }

    &-body {
        width: 80%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &_content {
            display: flex;
            border-bottom: 1px solid #2c3e50;

            & > * {
                flex: 1;
            }
        }
    }
}

ul {
    display: flex;
    list-style-type: none;
    padding: 0;
}

li {
    margin: 0 10px;
}

</style>
