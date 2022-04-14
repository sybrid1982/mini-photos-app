import { shallowMount } from "@vue/test-utils";
import Minis from "@/components/Minis.vue"

describe('Minis', () => {
    const factory = (values) => {
        return shallowMount(Minis, 
            {
                data() {
                    return {
                        ...values
                    }
                }
            })
    }

    describe('fetchMinis', () => {
        it('checks the stored pages to avoid API calls', () => {
            const wrapper = factory({
                pages: {
                    1: mockData
                }
            })
            wrapper.vm.fetchMinisPage = jest.fn();

            wrapper.vm.fetchData(1);

            expect(wrapper.vm.fetchMinisPage).not.toHaveBeenCalled();
        });

        it('fetches needed pages', () => {
            const wrapper = factory({
                pages: {
                    1: [{"id":19,"completionDate":"2022-04-01T16:32:20.373","miniName":"Wasp","sculptor":"Big Child Creatives","gameId":1,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/2yngwkan.bex.jpg"]},{"id":18,"completionDate":"2022-03-26T19:34:27.847","miniName":"Wolverine","sculptor":"Big Child Creatives ","gameId":2,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/ncjea5do.5wz.jpg"]},{"id":17,"completionDate":"2022-03-26T19:33:38.651","miniName":"Magneto","sculptor":"Big Child Creatives ","gameId":2,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/33jcmlbz.acq.jpg","https://miniphotostorage.blob.core.windows.net/mini-photos/kthsxij1.w0b.jpg","https://miniphotostorage.blob.core.windows.net/mini-photos/21g5yphv.1re.jpg"]},{"id":16,"completionDate":"2022-03-26T19:32:43.817","miniName":"Storm","sculptor":"Big Child Creatives ","gameId":2,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/ljclkozl.k1q.jpg"]},{"id":15,"completionDate":"2022-03-21T21:27:33.664","miniName":"Ultron","sculptor":"Big Child Creatives","gameId":1,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/jg4gbvys.yb0.jpg"]},{"id":14,"completionDate":"2022-03-21T21:26:46.98","miniName":"Taskmaster","sculptor":"Big Child Creatives","gameId":1,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/4oerbs3z.f32.jpg"]},{"id":13,"completionDate":"2022-03-21T21:26:02.594","miniName":"Red Skull","sculptor":"Big Child Creatives ","gameId":1,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/ggxaqii4.cay.jpg"]},{"id":12,"completionDate":"2022-03-21T21:25:03.116","miniName":"Captain America ","sculptor":"Big Child Creatives ","gameId":1,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/kzspw2ro.1my.jpg"]},{"id":11,"completionDate":"2022-03-21T21:24:11.853","miniName":"Black Widow","sculptor":"Big Child Creatives ","gameId":1,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/eokeol2c.acz.jpg"]},{"id":10,"completionDate":"2022-03-21T21:23:08.546","miniName":"Ant-Man","sculptor":"Big Child Creatives ","gameId":1,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/nak2igck.fu5.jpg"]}]
                }
            })
            wrapper.vm.fetchMinisPage = jest.fn(() => Promise.resolve({minis: mockData, maxPages: 2, currentPage: 2} ));

            wrapper.vm.fetchData(2);

            expect(wrapper.vm.fetchMinisPage).toHaveBeenCalled();
        });
    })
    describe('processMinisForDisplay', () => {
        it('should set cover photo to a url containing thumbs', () => {
            const wrapper = factory({
                pages: []
            })

            const minis = wrapper.vm.processMinisForDisplay([mockData[0]]);
            expect(minis[0].coverPhoto.includes('thumbs')).toBeTruthy();
        })
    })
})

const mockData = [{"id":19,"completionDate":"2022-04-01T16:32:20.373","miniName":"Wasp","sculptor":"Big Child Creatives","gameId":1,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/2yngwkan.bex.jpg"]},{"id":18,"completionDate":"2022-03-26T19:34:27.847","miniName":"Wolverine","sculptor":"Big Child Creatives ","gameId":2,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/ncjea5do.5wz.jpg"]},{"id":17,"completionDate":"2022-03-26T19:33:38.651","miniName":"Magneto","sculptor":"Big Child Creatives ","gameId":2,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/33jcmlbz.acq.jpg","https://miniphotostorage.blob.core.windows.net/mini-photos/kthsxij1.w0b.jpg","https://miniphotostorage.blob.core.windows.net/mini-photos/21g5yphv.1re.jpg"]},{"id":16,"completionDate":"2022-03-26T19:32:43.817","miniName":"Storm","sculptor":"Big Child Creatives ","gameId":2,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/ljclkozl.k1q.jpg"]},{"id":15,"completionDate":"2022-03-21T21:27:33.664","miniName":"Ultron","sculptor":"Big Child Creatives","gameId":1,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/jg4gbvys.yb0.jpg"]},{"id":14,"completionDate":"2022-03-21T21:26:46.98","miniName":"Taskmaster","sculptor":"Big Child Creatives","gameId":1,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/4oerbs3z.f32.jpg"]},{"id":13,"completionDate":"2022-03-21T21:26:02.594","miniName":"Red Skull","sculptor":"Big Child Creatives ","gameId":1,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/ggxaqii4.cay.jpg"]},{"id":12,"completionDate":"2022-03-21T21:25:03.116","miniName":"Captain America ","sculptor":"Big Child Creatives ","gameId":1,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/kzspw2ro.1my.jpg"]},{"id":11,"completionDate":"2022-03-21T21:24:11.853","miniName":"Black Widow","sculptor":"Big Child Creatives ","gameId":1,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/eokeol2c.acz.jpg"]},{"id":10,"completionDate":"2022-03-21T21:23:08.546","miniName":"Ant-Man","sculptor":"Big Child Creatives ","gameId":1,"fileNames":["https://miniphotostorage.blob.core.windows.net/mini-photos/nak2igck.fu5.jpg"]}]