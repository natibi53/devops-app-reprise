describe('Create task', () => {
    it('Can add a task with proper data.', () => {
        cy.visit('/');

        cy.get('input[name="name"]').type('ceci est un test !');
        cy.get('input[name="dueDate"]').type('2000-01-01');
        cy.contains('Créer une tâche').click();

        cy.contains('Tâche créée avec succès.');
        cy.get('input[name="name"]').should('have.value', '');

        cy.getAllLocalStorage()
            .then(
                ls => expect(JSON.parse(ls[Cypress.config().baseUrl].tasks)).to.deep.equal([{ title: 'ceci est un test !', dueDate: '2000-01-01' }])
            )
        ;
    });
});

describe('Fail to create task', () => {
    it('Cannot add a task if data isn\'t correct.', () => {
        cy.visit('/');

        cy.get('input[name="name"]').type('ceci est un autre test !');
        cy.contains('Créer une tâche').click();

        cy.contains('Veuillez remplir tous les champs.');
        cy.get('input[name="name"]').should('have.value', 'ceci est un autre test !');
    });
});