import { localAxios } from "@/util/http-commons"

const local = localAxios()

function listPlan(param, success, fail) {
    local.get(`/plan`, { params: param }).then(success).catch(fail)
}

function createPlan(groupId, plan, success, fail) {
    console.log("plan.js plan", plan);
    local.post(`/plan/${groupId}`, JSON.stringify(plan)).then(success).catch(fail)
}

function getPlan(planId, success, fail) {
    local.get(`/plan/${planId}`).then(success).catch(fail)
}

function updatePlan(planId, plan, success, fail) {
    local.put(`/plan/${planId}`, JSON.stringify(plan)).then(success).catch(fail)
}

function deletePlan(planId, success, fail) {
    local.delete(`/plan/${planId}`).then(success).catch(fail)
}

export {
    listPlan,
    createPlan,
    getPlan,
    updatePlan,
    deletePlan,
}