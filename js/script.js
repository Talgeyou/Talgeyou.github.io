let calculateAttackDV = function (characterAttack) {
    if (characterAttack === 0) {
        console.log("Attack DV: 0")
        return 0;
    }
    let artifactAttack = +document.getElementById("artifactAttackInput").value;
    let attackDV = artifactAttack / characterAttack * 100;
    console.log("Attack DV: " + attackDV);
    return attackDV;
}

let calculateAttackPercentageDV = function (characterBaseAttack, characterAttack) {
    if (characterAttack === 0) {
        console.log("Attack Percentage DV: 0")
        return 0;
    }
    let artifactPercentageAttack = +document.getElementById("artifactAttackPercentageInput").value;
    let attackPercentageDV = artifactPercentageAttack * characterBaseAttack / characterAttack;
    console.log("Attack Percentage DV: " +attackPercentageDV)
    return attackPercentageDV;

}

let calculatePhysicalDamageBonusDV = function () {
    let physicalDamageProportion = +document.getElementById("physicalDamageProportionInput").value;
    if (physicalDamageProportion === 0) {
        console.log("Physical Damage Bonus DV: 0");
        return 0;
    }
    let characterPhysicalDamageBonus = +document.getElementById("physicalDamageBonusInput").value;
    let artifactPhysicalDamageBonus = +document.getElementById("artifactPhysicalDamageBonusInput").value;
    let physicalDamageBonusDV = artifactPhysicalDamageBonus / (100 + characterPhysicalDamageBonus) * (physicalDamageProportion / 100) * 100;
    console.log("Physical Damage Bonus DV: " + physicalDamageBonusDV);
    return physicalDamageBonusDV;
}

let calculateElementalDamageBonusDV = function () {
    let elementalDamageProportion = +document.getElementById("elementalDamageProportionInput").value;
    if (elementalDamageProportion === 0) {
        console.log("Elemental Damage Bonus DV: 0");
        return 0;
    }
    let characterElementalDamageBonus = +document.getElementById("elementalDamageBonusInput").value;
    let artifactElementalDamageBonus = +document.getElementById("artifactElementalDamageBonusInput").value;
    let elementalDamageBonusDV = artifactElementalDamageBonus / (100 + characterElementalDamageBonus) * (elementalDamageProportion / 100) * 100;
    console.log("Elemental Damage Bonus DV: " + elementalDamageBonusDV);
    return elementalDamageBonusDV;
}

let calculateCritDV = function () {
    let characterCritRate = +document.getElementById("critRateInput").value;
    let characterCritDamage = +document.getElementById("critDamageInput").value;
    let artifactCritRate = +document.getElementById("artifactCritRateInput").value;
    let artifactCritDamage = +document.getElementById("artifactCritDamageInput").value;
    let critDV = (((1 - (characterCritRate + artifactCritRate) / 100) + (characterCritRate + artifactCritRate) / 100 * (100 + artifactCritDamage + characterCritDamage) / 100) - ((1 - characterCritRate / 100) + characterCritRate / 100 * (100 + characterCritDamage) / 100)) / ((1 - characterCritRate / 100) + characterCritRate / 100 * (100 + characterCritDamage) / 100) * 100;
    console.log("Crit DV: " + critDV);
    return critDV;
}

let calculateDV = function () {
    let characterBaseAttack = +document.getElementById("baseAttackInput").value;
    let characterBonusAttack = +document.getElementById("bonusAttackInput").value;
    let characterAttack = characterBaseAttack + characterBonusAttack;
    let attackDV = calculateAttackDV(characterAttack);
    let attackPercentageDV = calculateAttackPercentageDV(characterBaseAttack, characterAttack);
    let physicalDamageBonusDV = calculatePhysicalDamageBonusDV();
    let elementalDamageBonusDV = calculateElementalDamageBonusDV();
    let critDV = calculateCritDV();
    console.log(attackDV + attackPercentageDV + physicalDamageBonusDV + elementalDamageBonusDV + critDV);
    document.getElementById("damageValue").innerHTML = attackDV + attackPercentageDV + physicalDamageBonusDV + elementalDamageBonusDV + critDV;
};