<template>
    <div>
        <div :id = "id" class="modal">
            <div class="modal-content">
                <h4>Operating Hours
                </h4>
                <table v-if = "operatingHour">
                    <tbody>
                        <tr v-for = "(hours,day) in operatingHour" v-bind:key = "day">
                            <td>
                                {{day}}
                            </td>
                            <td>
                                {{hours}}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="modal-footer text-center">
                    <button class="btn waves-effect waves-light red" @click="close()"> Close </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: "OperatingHourModal",
    props: {
        operatingHour: Object,
        id: String
    },
    methods: {
        ...mapGetters(["fetchOperatingHour"]),
        close() {
            // Delegate closing of modal to the parent class
            this.$emit('did_click_close')
        }
    }
}
</script>