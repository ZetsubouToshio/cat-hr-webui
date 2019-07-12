export function parseGitHubAnswer(data) {
    const result = data.match(/"email": ".*"/ig);
    return result ? result.map(e => e.replace(/"/gi, ' ').split(":")[1].trim()).filter(onlyUnique) : [];
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}