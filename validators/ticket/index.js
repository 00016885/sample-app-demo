const expressValidator = require('express-validator');

const body = expressValidator.body;
const param = expressValidator.param;

const ticket_service = require('../../services/ticket')

const addTicketValidation = (req) => {
  return [
    body('eventName')
      .notEmpty().withMessage((value, { req }) => req.t('middleware.validator.event_name.not_empty'))
      .isLength({ min: 8, max: 255 }).withMessage((value, { req }) => req.t('middleware.validator.event_name.length')),
    body('eventDateTime')
      .notEmpty().withMessage((value, { req }) => req.t('middleware.validator.event_datetime.not_empty'))
      .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/, 'g')
        .withMessage((value, { req }) => req.t('middleware.validator.event_datetime.format')),
    body('venue')
      .notEmpty().withMessage((value, { req }) => req.t('middleware.validator.venue.not_empty')),
    body('contactPhone')
      .notEmpty().withMessage((value, { req }) => req.t('middleware.validator.contact_phone.not_empty'))
      .matches(/^\+998\d{9}$/).withMessage((value, { req }) => req.t('middleware.validator.contact_phone.format')),
    body('seat')
      .notEmpty().withMessage((value, { req }) => req.t('middleware.validator.seat.not_empty')),      
  ];
};

const deleteTicketValidation = (req) => {
  return [
    param('id').custom(async (id) => {
      const exists = await ticket_service.getById(id);
      if (!exists) {
        throw new Error((value, { req }) => req.t('middleware.validator.ticket.not_empty'));
      }
    })
  ];
};

const updateTicketValidation = (req) => {
  return [
    param('id').custom(async (id) => {
      const exists = await ticket_service.getById(id);
      if (!exists) {
        throw new Error((value, { req }) => req.t('middleware.validator.ticket.not_empty'));
      }
    }),
    body('eventName')
      .notEmpty().withMessage((value, { req }) => req.t('middleware.validator.event_name.not_empty'))
      .isLength({ min: 8, max: 255 }).withMessage((value, { req }) => req.t('middleware.validator.event_name.length')),
    body('eventDateTime')
      .notEmpty().withMessage((value, { req }) => req.t('middleware.validator.event_datetime.not_empty'))
      .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/, 'g')
        .withMessage((value, { req }) => req.t('middleware.validator.event_datetime.format')),
    body('venue')
      .notEmpty().withMessage((value, { req }) => req.t('middleware.validator.venue.not_empty')),
    body('contactPhone')
      .notEmpty().withMessage((value, { req }) => req.t('middleware.validator.contact_phone.not_empty'))
      .matches(/^\+998\d{9}$/).withMessage((value, { req }) => req.t('middleware.validator.contact_phone.format')),
    body('seat')
      .notEmpty().withMessage((value, { req }) => req.t('middleware.validator.seat.not_empty')),      
  ];
};

module.exports = {
    addTicketValidation,
    updateTicketValidation,
    deleteTicketValidation
};
