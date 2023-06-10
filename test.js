function generateSearchConditions(string) {
    const words = string.split(" ");
    const searchConditions = words.map(word => {
        return `{\\"title\\":{\\"$iLike\\":\\"%${word}%\\"}},{\\"description\\":{\\"$iLike\\":\\"%${word}%\\"}},`;
    }).join("");
    const finalObject = `"{\\"$or\\":[${searchConditions.slice(0, -1)}]}"`;
    return finalObject;
}

console.log(generateSearchConditions("start the day"));
console.log(typeof(generateSearchConditions("start the day")));

"{\"$or\":[{\"title\":{\"$iLike\":\"%start%\"}},{\"title\":{\"$iLike\":\"%the%\"}},{\"title\":{\"$iLike\":\"%day%\"}},{\"description\":{\"$iLike\":\"%start%\"}},{\"description\":{\"$iLike\":\"%the%\"}},{\"description\":{\"$iLike\":\"%day%\"}}]}"

{ "$or": [{ "title": { "$iLike": "%start%" } }, { "description": { "$iLike": "%start%" } }, { "title": { "$iLike": "%the%" } }, { "description": { "$iLike": "%the%" } }, { "title": { "$iLike": "%day%" } }, { "description": { "$iLike": "%day%" } }] }