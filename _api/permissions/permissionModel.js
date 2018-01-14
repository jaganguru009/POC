var mongoose = require('mongoose');

var permissionSchema = mongoose.Schema(
    {
        name:
            {
                type: String,
                required: true,
                unique: true
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

var Permission = module.exports = mongoose.model('permissions', permissionSchema);
