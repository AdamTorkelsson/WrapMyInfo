var router = require("express").Router();

// Controllers
var userController = require("./controllers/user.controller");
var authController = require("./controllers/auth.controller");
var groupController = require("./controllers/group.controller");
var schemaController = require("./controllers/schema.controller");
var staticController = require("./controllers/static.controller");


// User Controller

router.get('/users', userController.getUsers); // Get Users belonging to a Developer
router.post('/users', userController.postUser); // Create User owned by the Developer

router.get('/users/:user/schemas', userController.getSchemas); // Get all Schemas connected to a User via Document

router.get('/users/:user/schemas/:schema/documents', userController.getDocuments); // Get Users Documents tied to a specific Schema
router.post('/users/:user/schemas/:schema/documents', userController.postDocument); // Create new Document tied to specified User and Schema

router.get('/users/:user/schemas/:schema/documents/:document', userController.getDocument); // Get Document
router.put('/users/:user/schemas/:schema/documents/:document', userController.putDocument); // Update Document
router.delete('/users/:user/schemas/:schema/documents/:document', userController.deleteDocument); // Delete Document TODO: along with all Blobs

router.get('/users/:user/schemas/:schema/documents/:document/blobs', userController.getBlobs); // Get all Blobs tied to specified Document
router.post('/users/:user/schemas/:schema/documents/:document/blobs', userController.postBlob); // Create new Blob tied to specified Document

router.get('/users/:user/schemas/:schema/documents/:document/blobs/:blob', userController.getBlob);
router.put('/users/:user/schemas/:schema/documents/:document/blobs/:blob', userController.putBlob);
router.delete('/users/:user/schemas/:schema/documents/:document/blobs/:blob', userController.deleteBlob);

router.get('/users/:user/ownergroups/', userController.getOwnerGroups);
router.post('/users/:user/ownergroups/', userController.postOwnerGroups);

router.put('/users/:user/ownergroups/:group', userController.putOwnerGroup);
router.delete('/users/:user/ownergroups/:group', userController.deleteOwnerGroup);

router.get('/users/:user/membergroups/', userController.getMemberGroups);
router.post('/users/:user/membergroups/', userController.postMemberGroups);

router.put('/users/:user/membergroups/:group', userController.putMemberGroup);
router.delete('/users/:user/membergroups/:group', userController.deleteMemberGroup);


// Group Controller

router.get('/groups', groupController.getGroups); // Get all Groups associated with a Developer
router.post('/groups', groupController.postGroup); // Create Group

router.get('/groups/:group', groupController.getGroup);
router.put('/groups/:group', groupController.putGroup);
router.delete('/groups/:group', groupController.deleteGroup);

router.get('/groups/:group/members', groupController.getGroupMembers);

router.post('/groups/:group/members/:user', groupController.postGroupMember);
router.delete('/groups/:group/members/:user', groupController.deleteGroupMember);

router.get('/groups/:group/owners', groupController.getGroupOwners);

router.post('/groups/:group/owners/:user', groupController.postGroupOwner);
router.delete('/groups/:group/owners/:user', groupController.deleteGroupOwner);


// Schema Controller

router.get('/schemas', schemaController.getSchemas);
router.post('/schemas', schemaController.postSchemas);

router.get('/schemas/:schema', schemaController.getSchema);
router.put('/schemas/:schema', schemaController.putSchema);
router.delete('/schemas/:schema', schemaController.deleteSchema);


// Auth Controller

router.get('/auth/:key', authController.getToken);


// Static Controller

router.get('/', staticController.home);
router.get('/about', staticController.getAbout);

module.exports = router;