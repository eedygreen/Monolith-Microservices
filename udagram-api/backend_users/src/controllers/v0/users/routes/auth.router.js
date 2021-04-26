"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthRouter = exports.requireAuth = void 0;
var express_1 = require("express");
var User_1 = require("../models/User");
var c = require("../../../../config/config");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var EmailValidator = require("email-validator");
var router = express_1.Router();
function generatePassword(plainTextPassword) {
    return __awaiter(this, void 0, void 0, function () {
        var saltRounds, salt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    saltRounds = 10;
                    return [4 /*yield*/, bcrypt.genSalt(saltRounds)];
                case 1:
                    salt = _a.sent();
                    return [4 /*yield*/, bcrypt.hash(plainTextPassword, salt)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function comparePasswords(plainTextPassword, hash) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt.compare(plainTextPassword, hash)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function generateJWT(user) {
    return jwt.sign(user.short(), c.config.jwt.secret);
}
function requireAuth(req, res, next) {
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).send({ message: 'No authorization headers.' });
    }
    var tokenBearer = req.headers.authorization.split(' ');
    if (tokenBearer.length != 2) {
        return res.status(401).send({ message: 'Malformed token.' });
    }
    var token = tokenBearer[1];
    return jwt.verify(token, c.config.jwt.secret, function (err, decoded) {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
        }
        return next();
    });
}
exports.requireAuth = requireAuth;
router.get('/verification', requireAuth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, res.status(200).send({ auth: true, message: 'Authenticated.' })];
    });
}); });
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, user, authValid, jwt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                if (!email || !EmailValidator.validate(email)) {
                    return [2 /*return*/, res.status(400).send({ auth: false, message: 'Email is required or malformed.' })];
                }
                if (!password) {
                    return [2 /*return*/, res.status(400).send({ auth: false, message: 'Password is required.' })];
                }
                return [4 /*yield*/, User_1.User.findByPk(email)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(401).send({ auth: false, message: 'User was not found..' })];
                }
                return [4 /*yield*/, comparePasswords(password, user.passwordHash)];
            case 2:
                authValid = _a.sent();
                if (!authValid) {
                    return [2 /*return*/, res.status(401).send({ auth: false, message: 'Password was invalid.' })];
                }
                jwt = generateJWT(user);
                res.status(200).send({ auth: true, token: jwt, user: user.short() });
                return [2 /*return*/];
        }
    });
}); });
router.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, plainTextPassword, user, generatedHash, newUser, savedUser, jwt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                plainTextPassword = req.body.password;
                if (!email || !EmailValidator.validate(email)) {
                    return [2 /*return*/, res.status(400).send({ auth: false, message: 'Email is missing or malformed.' })];
                }
                if (!plainTextPassword) {
                    return [2 /*return*/, res.status(400).send({ auth: false, message: 'Password is required.' })];
                }
                return [4 /*yield*/, User_1.User.findByPk(email)];
            case 1:
                user = _a.sent();
                if (user) {
                    return [2 /*return*/, res.status(422).send({ auth: false, message: 'User already exists.' })];
                }
                return [4 /*yield*/, generatePassword(plainTextPassword)];
            case 2:
                generatedHash = _a.sent();
                return [4 /*yield*/, new User_1.User({
                        email: email,
                        passwordHash: generatedHash
                    })];
            case 3:
                newUser = _a.sent();
                return [4 /*yield*/, newUser.save()];
            case 4:
                savedUser = _a.sent();
                jwt = generateJWT(savedUser);
                res.status(201).send({ token: jwt, user: savedUser.short() });
                return [2 /*return*/];
        }
    });
}); });
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send('auth');
        return [2 /*return*/];
    });
}); });
exports.AuthRouter = router;
