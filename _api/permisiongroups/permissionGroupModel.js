var mongoose = require('mongoose');

var permisionGroup = mongoose.Schema(
    {
        name:
            {
                type: String,
                required: true,
                unique: true
            },
        permissions:
            {
                type: Array[],
                required: true
            },
        created:
            {
                type: Date,
                default: Date.now
            },
        lastUpdated:
            {
                type: Date
            }
    }
);

var PermissionGroup = module.exports = mongoose.model('permissionGroups', permisionGroup);
