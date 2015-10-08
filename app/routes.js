var router = require("express").Router();
var authorize = require("./middlewares/authorize");

// Controllers
var userController = require("./controllers/user.controller");
var documentController = require("./controllers/document.controller");
var authController = require("./controllers/auth.controller");
var groupController = require("./controllers/group.controller");
var schemaController = require("./controllers/schema.controller");
var staticController = require("./controllers/static.controller");


// User Controller

router.get('/users', authorize.minDeveloper, userController.getUsers); // Get Users belonging to a Developer
router.post('/users', authorize.minDeveloper, userController.postUser); // Create User owned by the Developer

router.get('/users/:user/schemas', authorize.minUserOnSelf, userController.getSchemas); // Get all Schemas connected to a User via Document

router.get('/users/:user/ownergroups/', authorize.minUserOnSelf, userController.getOwnerGroups);
router.post('/users/:user/ownergroups/', authorize.minDeveloper, userController.postOwnerGroups);

router.delete('/users/:user/ownergroups/:group', authorize.minUserOnSelf, userController.deleteOwnerGroup);

router.get('/users/:user/membergroups/', authorize.minUserOnOwnedUser, userController.getMemberGroups);
router.post('/users/:user/membergroups/', authorize.minUserOnSelf, userController.postMemberGroups);

router.delete('/users/:user/membergroups/:group', authorize.minUserOnSelf, userController.deleteMemberGroup);


// Document Controller

router.get('/users/:user/schemas/:schema/documents', authorize.minUserOnOwnedUser, documentController.getDocuments); // Get Users Documents tied to a specific Schema
router.post('/users/:user/schemas/:schema/documents', authorize.minUserOnOwnedUser, documentController.postDocument); // Create new Document tied to specified User and Schema

router.get('/users/:user/schemas/:schema/documents/:document', authorize.minUserOnOwnedUser, documentController.getDocument); // Get Document
router.put('/users/:user/schemas/:schema/documents/:document', authorize.minUserOnOwnedUser, documentController.putDocument); // Update Document
router.delete('/users/:user/schemas/:schema/documents/:document', authorize.minUserOnOwnedUser, documentController.deleteDocument); // Delete Document TODO: along with all Blobs

router.get('/users/:user/schemas/:schema/documents/:document/blobs', authorize.minUserOnOwnedUser, documentController.getBlobs); // Get all Blobs tied to specified Document
router.post('/users/:user/schemas/:schema/documents/:document/blobs', authorize.minUserOnOwnedUser, documentController.postBlob); // Create new Blob tied to specified Document

router.get('/users/:user/schemas/:schema/documents/:document/blobs/:blob', authorize.minUserOnOwnedUser, documentController.getBlob);
router.put('/users/:user/schemas/:schema/documents/:document/blobs/:blob', authorize.minUserOnOwnedUser, documentController.putBlob);
router.delete('/users/:user/schemas/:schema/documents/:document/blobs/:blob', authorize.minUserOnOwnedUser, documentController.deleteBlob);


// Group Controller

router.get('/groups', authorize.minDeveloper, groupController.getGroups); // Get all Groups associated with a Developer
router.post('/groups', authorize.minDeveloper, groupController.postGroup); // Create Group

router.get('/groups/:group', authorize.minMemberOfGroup, groupController.getGroup);
router.put('/groups/:group', authorize.minDeveloper, groupController.putGroup);
router.delete('/groups/:group', authorize.minDeveloper, groupController.deleteGroup);

router.get('/groups/:group/members', authorize.minOwnerOfGroup, groupController.getGroupMembers);
router.post('/groups/:group/members/', authorize.minUserOnSelf, groupController.postGroupMember);

router.delete('/groups/:group/members/:user', authorize.minUserOnSelf, groupController.deleteGroupMember);

router.get('/groups/:group/owners', authorize.minDeveloper, groupController.getGroupOwners);
router.post('/groups/:group/owners/', authorize.minDeveloper, groupController.postGroupOwner);

router.delete('/groups/:group/owners/:user', authorize.minDeveloper, groupController.deleteGroupOwner);


// Schema Controller

router.get('/schemas', authorize.minDeveloper, schemaController.getSchemas);
router.post('/schemas', authorize.minDeveloper, schemaController.postSchema);

router.get('/schemas/:schema', authorize.minDeveloper, schemaController.getSchema);
router.put('/schemas/:schema', authorize.minDeveloper, schemaController.putSchema);
router.delete('/schemas/:schema', authorize.minDeveloper, schemaController.deleteSchema);


// Auth Controller

router.post('/auth/developer', authorize.all, authController.postDeveloperToken);
router.post('/auth/user', authorize.all, authController.postUserToken);

router.get('/auth/status', authorize.all, authController.getAuthStatus);


// Static Controller

router.get('/', authorize.all, staticController.home);
router.get('/about', authorize.all, staticController.getAbout);

module.exports = router;