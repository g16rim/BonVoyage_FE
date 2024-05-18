import { dataAxios } from '@/util/http-commons'
import { localAxios } from "@/util/http-commons"

const search = dataAxios()
const local = localAxios()

function searchPlaces(param, success, fail) {
    search.get(`/searchKeyword1`, { params: param }).then(success).catch(fail)
}

function checkSitesExisting(sites, success, fail) {
    local.post(`/travel/site`, JSON.stringify(sites)).then(success).catch(fail)
}

function registDetailPlan(planId, plans, success, fail) {
    local.post(`/detail/${planId}`, JSON.stringify(plans)).then(success).catch(fail)
}

export { searchPlaces, checkSitesExisting, registDetailPlan }