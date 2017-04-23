export type JobID = 'idle' | 'breeder' | 'forager' |
    'nurse' | 'producer_food' | 'producer_honey' |
    'builder' | 'undertaker' | 'guard';
export const JobID = {
    IDLE: 'idle' as JobID, BREEDER: 'breeder' as JobID, FORAGER: 'forager' as JobID,
    NURSE: 'nurse' as JobID, PRODUCER_FOOD: 'producer_food' as JobID, PRODUCER_HONEY: 'producer_honey' as JobID,
    BUILDER: 'builder' as JobID, UNDERTAKER: 'undertaker' as JobID, GUARD: 'guard' as JobID
}
export type AbilityID = 'def' | 'rng' |
    'str_pollen' | 'str_nectar' | 'str_water' |
    'spd_fly' | 'spd_clt' | 'spd_dep' |
    'prd_honey' | 'yld_honey' | 'cost_honey_nectar' |
    'prd_wax' | 'yld_wax' | 'cost_wax_food' |
    'prd_jelly' | 'yld_jelly' | 'cost_jelly_honey' | 'cost_jelly_pollen' |
    'prd_food' | 'yld_food' | 'cost_food_pollen' | 'cost_food_honey' | 'cost_food_water' | 'cost_food_deadbees' |
    'prd_egg';
export const AbilityID = {
    DEF: 'def' as AbilityID, RNG: 'rng' as AbilityID,
    STR_POLLEN: 'str_pollen' as AbilityID, STR_NECTAR: 'str_nectar' as AbilityID, STR_WATER: 'str_water' as AbilityID,
    SPD_FLY: 'spd_fly' as AbilityID, SPD_CLT: 'spd_clt' as AbilityID, SPD_DEP: 'spd_dep' as AbilityID,
    PRD_HONEY: 'prd_honey' as AbilityID, YLD_HONEY: 'yld_honey' as AbilityID, COST_HONEY_NECTAR: 'cost_honey_nectar' as AbilityID,
    PRD_WAX: 'prd_wax' as AbilityID, YLD_WAX: 'yld_wax' as AbilityID, COST_WAX_FOOD: 'cost_wax_food' as AbilityID,
    PRD_JELLY: 'prd_jelly' as AbilityID, YLD_JELLY: 'yld_jelly' as AbilityID, COST_JELLY_HONEY: 'cost_jelly_honey' as AbilityID, COST_JELLY_POLLEN: 'cost_jelly_pollen' as AbilityID,
    PRD_FOOD: 'prd_food' as AbilityID, YLD_FOOD: 'yld_food' as AbilityID, COST_FOOD_POLLEN: 'cost_food_pollen' as AbilityID, COST_FOOD_HONEY: 'cost_food_honey' as AbilityID, COST_FOOD_WATER: 'cost_food_water' as AbilityID, COST_FOOD_DEADBEES: 'cost_food_deadbees' as AbilityID,
    PRD_EGG: 'prd_egg' as AbilityID,
    Get_STR: function (rid: ResourceID): AbilityID {
        switch (rid) {
            case 'nectar':
                return AbilityID.STR_NECTAR;
            case 'pollen':
                return AbilityID.STR_POLLEN;
            case 'water':
                return AbilityID.STR_WATER;
        }
    }
}
export type ResourceID = 'nectar' | 'pollen' | 'water' | 'food' | 'honey' | 'royal_jelly' | 'wax' | 'deadbees' | 'defense';
export const ResourceID = {
    NECTAR: 'nectar' as ResourceID,
    POLLEN: 'pollen' as ResourceID,
    WATER: 'water' as ResourceID,
    FOOD: 'food' as ResourceID,
    HONEY: 'honey' as ResourceID,
    ROYAL_JELLY: 'royal_jelly' as ResourceID,
    WAX: 'wax' as ResourceID,
    DEADBEES: 'deadbees' as ResourceID,
    DEFENSE: 'defense' as ResourceID
}

export type BuildingID = 'dormitory' | 'nursery' | 'storage_nectar' | 'storage_pollen' | 'storage_water' | 'storage_wax' | 'storage_jelly' | 'storage_honey' | 'storage_food';
export const BuildingID = {
    DORMITORY: 'dormitory' as BuildingID,
    NURSERY: 'nursery' as BuildingID,
    STORAGE_NECTAR: 'storage_nectar' as BuildingID,
    STORAGE_POLLEN: 'storage_pollen' as BuildingID,
    STORAGE_WATER: 'storage_water' as BuildingID,
    STORAGE_WAX: 'storage_wax' as BuildingID,
    STORAGE_JELLY: 'storage_jelly' as BuildingID,
    STORAGE_HONEY: 'storage_honey' as BuildingID,
    STORAGE_FOOD: 'storage_food' as BuildingID
}