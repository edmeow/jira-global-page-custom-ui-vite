import Resolver from '@forge/resolver';

const resolver = new Resolver();

resolver.define('getText', (req) => {
    console.log(req);

    return 'Hi, is hot reload here??';
});

export const handler = resolver.getDefinitions();

