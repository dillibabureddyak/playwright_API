import { test, expect } from '@playwright/test';

test('Confirm Pokémon number 812 is Rillaboom', async ({ request }) => {
    const response = await request.get('/api/v2/pokemon/812');
    await expect(response).toHaveStatusCode(200);
    await expect(response).toMatchJSON({ name: 'rillaboom' });
});

test('Check 5th gen of games is set to Unova, and there are two resources in version groups', async ({ request }) => {
    const response = await request.get('/api/v2/generation/5');
    await expect(response).toHaveStatusCode(200);
    await expect(response).toMatchJSON({ main_region: { name: "unova" } });
    expect((await response.json()).version_groups).toHaveLength(2);
});

test('Check that you can search for all the Pokémon in  the kanto', async ({ request }) => {
    const response = await request.get('/api/v2/pokedex/kanto');
    await expect(response).toHaveStatusCode(200);
    expect((await response.json()).pokemon_entries).toHaveLength(151);
    const kantoPokémons = ["bulbasaur", "venusaur", "charizard", "blastoise", "metapod"];
    kantoPokémons.forEach(pokémon => expect(response).toContainTextContent(pokémon));
});



