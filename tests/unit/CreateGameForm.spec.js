import { shallowMount } from "@vue/test-utils";
import CreateGameForm from '@/components/CreateGameForm.vue';

describe('CreateGameForm', () => {
    const factory = (values) => {
        return shallowMount(CreateGameForm, 
            {
                data() {
                    return {
                        ...values
                    }
                }
            })
    }
    describe('validateInputs', () => {
        it('requires gameName to have characters', () => {
            const wrapper = factory({
                form: {
                    gameName: "",
                    yearPublished: "2002",
                    style: "French Jazz",
                    scale: "Lizard"
                }
            })

            expect(wrapper.find('.save-button').attributes().disabled).toBeTruthy();
        });
        it('requires yearPublished to have chararters', () => {
            const wrapper = factory({
                form: {
                    gameName: "Fake Game",
                    yearPublished: "",
                    style: "French Jazz",
                    scale: "Lizard"
                }
            })
            expect(wrapper.find('.save-button').attributes().disabled).toBeTruthy();
        })
        it('requires yearPublished to have no more than 4 characters', () => {
            const wrapper = factory({
                form: {
                    gameName: "Fake Game",
                    yearPublished: "40000",
                    style: "French Jazz",
                    scale: "Lizard"
                }
            })
            expect(wrapper.find('.save-button').attributes().disabled).toBeTruthy();
        })
        it('requires yearPublished to be convertable to a number', () => {
            const wrapper = factory({
                form: {
                    gameName: "Fake Game",
                    yearPublished: "Pants",
                    style: "French Jazz",
                    scale: "Lizard"
                }
            })
            expect(wrapper.find('.save-button').attributes().disabled).toBeTruthy();
        })

        it('requires style to have chararters', () => {
            const wrapper = factory({
                form: {
                    gameName: "Fake Game",
                    yearPublished: "2002",
                    style: "",
                    scale: "Lizard"
                }
            })
            expect(wrapper.find('.save-button').attributes().disabled).toBeTruthy();
        })
        it('requires scale to have chararters', () => {
            const wrapper = factory({
                form: {
                    gameName: "Fake Game",
                    yearPublished: "2002",
                    style: "French Jazz",
                    scale: ""
                }
            })
            expect(wrapper.find('.save-button').attributes().disabled).toBeTruthy();
        })
        it('enables the save button when all fields are filled out', () => {
            const wrapper = factory({
                form: {
                    gameName: "Fake Game",
                    yearPublished: "2002",
                    style: "French Jazz",
                    scale: "Lizard"
                }
            })
            expect(wrapper.find('.save-button').attributes().disabled).toBeFalsy();
        })
    })
})