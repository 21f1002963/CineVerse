const createFactory = (ElementModel) => {
    return async function (req, res) {
        try{
            const elementDetails = req.body;
            const element = await ElementModel.create(elementDetails);
            res.status(200).json({
                status: "successful",
                data: element
            });
        } catch (err) {
            res.status(500).json({
                status: "failure",
                message: err.message
            });
        }
    }
}

const getAllFactory = (ElementModel) => {
    return async function (req, res) {
        try {
            const elementDataStore = await ElementModel.find();
            res.status(200).json({
                status: "success",
                data: elementDataStore
            });
        } catch (err) {
            res.status(500).json({
                status: "failure",
                message: err.message
            });
        }
    }
}

const getByIdFactory = (ElementModel) => {
    return async function (req, res) {
        try {
            const elementId = req.params.elementId;
            const elementDetails = await ElementModel.findById(elementId);
            if (!elementDetails) {
                return res.status(404).json({
                    status: "failure",
                    message: `Element with id ${elementId} not found`
                });
            }
            res.status(200).json({
                status: "successful",
                data: elementDetails
            });
        } catch (err) {
            res.status(500).json({
                status: "failure",
                message: err.message
            });
        }
    }
}

const deleteByIdFactory = (ElementModel) => {
    return async function (req, res) {
        let { elementId } = req.params;
        try {
            let element = await ElementModel.findByIdAndDelete(elementId);
            if (!element) {
                return res.status(404).json({
                    status: "failure",
                    message: `Element with id ${elementId} not found`
                });
            }
            res.status(200).json({
                status: "successful",
                data: element
            });
        } catch (err) {
            res.status(500).json({
                status: "failure",
                message: err.message
            });
        }
    }
}

module.exports = {
    createFactory,
    getAllFactory,
    getByIdFactory,
    deleteByIdFactory
}

