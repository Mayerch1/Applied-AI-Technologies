"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lecture = void 0;
class Lecture {
    constructor(id, topic, profID, slackID) {
        this.id = id;
        this.topic = topic || '';
        this.profID = profID;
        this.slackID = slackID;
    }
}
exports.Lecture = Lecture;
//# sourceMappingURL=Hephaistos.js.map