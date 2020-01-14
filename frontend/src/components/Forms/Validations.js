// Validations for forms
function areUrlPartsValid(url) {
    try {
        let repo = url.split(":");
        let https = repo[0];
        let github = repo[1].split("/");
        return https === "https" &&
            github[2] === "github.com" &&
            github.length >= 5;
    }
    catch (e) {
        return false
    }

}

function validateUrl(url) {
    let errors = [];
    if (url === "" || url === undefined) {
        errors.push("Repository link can't be empty");
    } else {
        if (!areUrlPartsValid(url)) {
            errors.push("Repository link must be in proper format")
        }
    }

    return errors

}

function validatePlan(plan) {
    let errors = [];
    if (plan.length === 0) {
        errors.push("Plan link can't be empty");
    } else if (!plan.startsWith("http")){
        errors.push("Plan must be url and starts with http(s)")
    }
    return errors
}

function validateModule(module) {
    let errors = [];
    const modulesOptions = ['PB', 'WEB', 'OOP', "ADV"];
    if (!modulesOptions.includes(module)) {
        errors.push("Please choose a module");
    }
    return errors
}
export function validate(url, plan, module) {
    return [validateUrl(url), validatePlan(plan), validateModule(module)]
}