const userId = 'davehakkens'
const profileTypesCount = 5
const urlLondon =
  'https://nominatim.openstreetmap.org/search?format=json&q=london&accept-language=en'

describe('[Map]', () => {
  it('[Shows expected pins]', () => {
    cy.viewport('macbook-16')

    cy.step('Shows all pins onload')
    cy.visit('/map')

    cy.step('Old map pins can be clicked on')
    cy.get(`[data-cy=pin-${userId}]`).click()
    cy.get('[data-cy=MapMemberCard]').within(() => {
      cy.get('[data-cy=Username]').contains(userId)
    })
    cy.url().should('include', `#${userId}`)

    cy.step('Old map pins can be hidden')
    cy.get('.markercluster-map').click(0, 0)
    cy.get('[data-cy=MapMemberCard]').should('not.exist')
    cy.url().should('not.include', `#${userId}`)

    cy.step('Link to new map visible and clickable')
    cy.get('[data-cy=Banner]').contains('Test it out!').click()
    cy.get('[data-cy=Banner]').contains('go back to the old one!')

    cy.step('New map shows the cards')
    cy.get('[data-cy="welome-header"]').should('be.visible')
    cy.get('[data-cy="CardList-desktop"]').should('be.visible')
    cy.get('[data-cy="list-results"]').contains('52 results in view')

    cy.step('Map filters can be used')
    cy.get('[data-cy=MapFilterProfileTypeCardList]')
      .first()
      .children()
      .should('have.length', profileTypesCount)
    cy.get('[data-cy=MapListFilter]').first().click()
    // Reduction in coverage until temp API removed
    // cy.get('[data-cy="list-results"]').contains('6 results in view')
    cy.get('[data-cy=MapListFilter-active]').first().click()
    cy.get('[data-cy="list-results"]').contains('52 results in view')

    cy.step('Users can select filters')
    cy.get('[data-cy=MapFilterList]').should('not.exist')
    cy.get('[data-cy=MapFilterList-OpenButton]').first().click()
    cy.get('[data-cy=MapFilterList]').should('be.visible')
    cy.get('[data-cy=MapFilterList-CloseButton]').first().click()

    cy.step('As the user moves in the list updates')
    for (let i = 0; i < 9; i++) {
      cy.get('.leaflet-control-zoom-in').click()
    }
    cy.get('[data-cy="list-results"]').contains('1 result')
    cy.get('[data-cy="CardList-desktop"]').within(() => {
      cy.get('[data-cy=CardListItem]')
        .within(() => {
          cy.contains(userId)
          cy.get('[data-cy="MemberBadge-member"]')
        })
        .should('have.attr', 'href')
        .and('include', `/u/${userId}`)
    })

    cy.step('New map pins can be clicked on')
    cy.get(`[data-cy=pin-${userId}]`).click()
    cy.get('[data-cy=PinProfile]').within(() => {
      cy.get('[data-cy=Username]').contains(userId)
      cy.contains('Wants to get started')
    })
    cy.url().should('include', `#${userId}`)

    cy.step('New map pins can be hidden with the cross button')
    cy.get('[data-cy=PinProfile]').should('be.visible')
    cy.get('[data-cy=PinProfileCloseButton]').click()
    cy.url().should('not.include', `#${userId}`)
    cy.get('[data-cy=PinProfile]').should('not.exist')

    cy.step('New map pins can be hidden by clicking the map')
    cy.get(`[data-cy=pin-${userId}]`).click()
    cy.url().should('include', `#${userId}`)
    cy.get('[data-cy=PinProfile]').should('be.visible')
    cy.get('.markercluster-map').click(10, 10)
    cy.url().should('not.include', `#${userId}`)
    cy.get('[data-cy=PinProfile]').should('not.exist')

    cy.step('Mobile list view can be shown')
    cy.viewport('samsung-note9')
    cy.get('[data-cy="CardList-desktop"]').should('not.be.visible')
    cy.get('[data-cy="CardList-mobile"]').should('not.be.visible')

    cy.get('[data-cy="ShowMobileListButton"]').click()
    cy.get('[data-cy="CardList-mobile"]').within(() => {
      cy.get('[data-cy=CardListItem]')
        .within(() => {
          cy.contains(userId)
          cy.get('[data-cy="MemberBadge-member"]')
        })
        .should('have.attr', 'href')
        .and('include', `/u/${userId}`)
    })
    cy.get('[data-cy=MapFilterProfileTypeCardList-ButtonRight]')
      .last()
      .click()
      .click()
    cy.get('[data-cy=MapListFilter]').last().click()

    cy.step('Mobile list view can be hidden')
    cy.get('[data-cy="ShowMapButton"]').click()
    cy.get('[data-cy="CardList-mobile"]').should('not.be.visible')

    cy.step('The whole map can be searched')
    cy.get('[data-cy="ShowMobileListButton"]').click()
    cy.get('[data-cy=osm-geocoding]').last().click().type('london')
    cy.intercept(urlLondon).as('londonSearch')
    cy.wait('@londonSearch')
    cy.contains('London, Greater London, England, United Kingdom').click()

    cy.get('.icon-cluster-many')
      .should('be.visible')
      .within(() => {
        cy.get('.icon-cluster-text').should('have.text', '3').and('be.visible')
      })
  })
})
