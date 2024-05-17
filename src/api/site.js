import { dataAxios } from '@/util/http-commons'

const search = dataAxios()

function searchPlaces(param, success, fail) {
    search.get(`/searchKeyword1`, { params: param }).then(success).catch(fail)
}

export { searchPlaces }