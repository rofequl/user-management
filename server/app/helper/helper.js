const generateRandomString = (myLength) => {
    const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
        {length: myLength},
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );
    return randomArray.join("");
};

function genUsername(data) {
    return (data.body.name.toLowerCase()).replace(/[^a-zA-Z]/g, "") + generateRandomString(10).toLowerCase().replace(/[^a-zA-Z]/g, "");
}

module.exports.genUsername = genUsername;