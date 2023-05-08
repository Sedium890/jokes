const Joke = require('../models/jokes.model');

exports.getJokes = async (req, res) => {
    try {
        const jokes = await Joke.find();
        res.status(200).json(jokes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getJoke = async (req, res) => {
    try {
        const joke = await Joke.findById(req.params.id);
        if (!joke) {
        return res.status(404).json({ message: 'Joke not found' });
        }
        res.status(200).json(joke);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createJoke = async (req, res) => {
    try {
        const joke = new Joke(req.body);
        const newJoke = await joke.save();
        res.status(201).json(newJoke);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateJokePut = async (req, res) => {
    const { setup, punchline } = req.body;
    if (!setup || setup.length < 10 || !punchline || punchline.length < 3) {
        return res.status(400).json({ message: 'Invalid joke data' });
    }
    try {
        const joke = await Joke.findByIdAndUpdate(req.params.id, {
        setup: setup,
        punchline: punchline
        }, { new: true });
        if (!joke) {
        return res.status(404).json({ message: 'Joke not found' });
        }
        res.status(200).json(joke);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    };

exports.updateJokePatch = async (req, res) => {
    const { setup, punchline } = req.body;
    const updates = {};
        if (setup) {
        if (setup.length >= 10) {
            updates.setup = setup;
        } else {
            return res.status(400).json({ message: 'Invalid joke data' });
        }
    }
    if (punchline) {
        if (punchline.length >= 3) {
            updates.punchline = punchline;
        } else {
            return res.status(400).json({ message: 'Invalid joke data' });
        }
    }
    try {
        const joke = await Joke.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!joke) {
            return res.status(404).json({ message: 'Joke not found' });
        }
        res.status(200).json(joke);
        } catch (err) {
        res.status(400).json({ message: err.message });
        }
    };

exports.deleteJoke = async (req, res) => {
    try {
        const joke = await Joke.findByIdAndDelete(req.params.id);
        if (!joke) {
        return res.status(404).json({ message: 'Joke not found' });
        }
        res.status(200).json({ message: 'Joke deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
