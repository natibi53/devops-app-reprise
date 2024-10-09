const todayShort = new Date().toISOString().slice(0, 10);
const today = todayShort + 'T00:00:00.000Z';

describe('Create task', () => {
    it('Can add a task with proper data.', () => {
        cy.visit('/');

        cy.get('input[name="name"]').type('ceci est un test !');
        cy.get('input[name="dueDate"]').type(todayShort);
        cy.contains('Créer une tâche').click();

        cy.contains('Tâche créée avec succès.');
        cy.get('input[name="name"]').should('have.value', '');

        cy.getAllLocalStorage()
            .then(
                ls => expect(JSON.parse(ls[Cypress.config().baseUrl].tasks)).to.deep.equal([{id: 0, title: 'ceci est un test !', start: today, end: today }])
            )
        ;

        cy.get('.rbc-event-content').contains('ceci est un test !');
    });

    after(() => {
        cy.saveLocalStorage('tasks');
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

describe('Get existing tasks', () => {
    before(() => {
        cy.restoreLocalStorage('tasks');
    });

    it('Can get existing tasks.', () => {
        cy.visit('/');

        cy.get('.rbc-event-content').contains('ceci est un test !');
    });
});