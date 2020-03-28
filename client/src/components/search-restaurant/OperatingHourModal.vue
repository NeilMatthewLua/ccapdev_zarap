<template>
    <div>
        <div class="modal">
            <div class="modal-content">
                <h4>Operating Hours</h4>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Monday
                            </td>
                            <td>
                                {{operatingHour.Monday}}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Tuesday
                            </td>
                            <td>
                                {{operatingHour.Tuesday}}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Wednesday
                            </td>
                            <td>
                                {{operatingHour.Wednesday}}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Thursday
                            </td>
                            <td>
                                {{operatingHour.Thursday}}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Friday
                            </td>
                            <td>
                                {{operatingHour.Friday}}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Saturday
                            </td>
                            <td>
                                {{operatingHour.Saturday}}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Sunday
                            </td>
                            <td>
                                {{operatingHour.Sunday}}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="modal-footer text-center">
                    <button class="modal-default-button" @click="close()"> Close </button>
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
        operatingHour: Object
    },
    methods: {
        ...mapGetters(["fetchOperatingHour"]),
        close() {
            this.$emit('close', false)
        }
    }
}
</script>