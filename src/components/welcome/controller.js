const apiWelcome = (req, res) => {
    res.status(200).json("Delilah-Resto: it works fine ;)");
    
};

module.exports = {
    apiWelcome
}