import Nexus from 'nexus';
import * as types from './gql/snippet.js';
import path from 'path';
const __dirname = path.resolve(path.dirname('server'));
const schema = Nexus.makeSchema({
    types,
    outputs: {
        typegen: path.join(__dirname, './', 'nexus-typegen.ts'),
        schema: path.join(__dirname, './', 'schema.graphql'),
    },
    contextType: {
        module: path.join(__dirname, '/src/context.ts'),
        export: 'Context',
    },
});
export default schema;
