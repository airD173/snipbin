import prisma from './database.js';
const context = ({ req, res }) => {
    return { req, res, prisma };
};
export default context;
