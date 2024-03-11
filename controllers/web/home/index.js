const ticket_service = require('../../../services/ticket')

const home_controller = {
    index: async (req, res) =>{
        res.render('home', { t: req.t });
    },
    add: async (req, res) =>{
        res.render('home/add_update', { mode: req.t('controller.web.home.add') });
    },
    update: async (req, res) =>{
        const eventData = await ticket_service.getById(req.params.id);
        res.render('home/add_update', { mode: req.t('controller.web.home.update'), eventData: eventData });
    }
};
  
module.exports = home_controller;
