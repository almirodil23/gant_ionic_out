'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">kan-gan documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-524cb7597af58d1691135b7d55d343e8813902a26eb961c58880b91ff7b6500132ff70654e1d7f4d208f2753802a4fdbbd9a5ae886b710e6f00f0ea0279a3bb5"' : 'data-bs-target="#xs-components-links-module-AppModule-524cb7597af58d1691135b7d55d343e8813902a26eb961c58880b91ff7b6500132ff70654e1d7f4d208f2753802a4fdbbd9a5ae886b710e6f00f0ea0279a3bb5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-524cb7597af58d1691135b7d55d343e8813902a26eb961c58880b91ff7b6500132ff70654e1d7f4d208f2753802a4fdbbd9a5ae886b710e6f00f0ea0279a3bb5"' :
                                            'id="xs-components-links-module-AppModule-524cb7597af58d1691135b7d55d343e8813902a26eb961c58880b91ff7b6500132ff70654e1d7f4d208f2753802a4fdbbd9a5ae886b710e6f00f0ea0279a3bb5"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GanttComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GanttComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GraficoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GraficoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/KanbanComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KanbanComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TabComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TabComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-524cb7597af58d1691135b7d55d343e8813902a26eb961c58880b91ff7b6500132ff70654e1d7f4d208f2753802a4fdbbd9a5ae886b710e6f00f0ea0279a3bb5"' : 'data-bs-target="#xs-injectables-links-module-AppModule-524cb7597af58d1691135b7d55d343e8813902a26eb961c58880b91ff7b6500132ff70654e1d7f4d208f2753802a4fdbbd9a5ae886b710e6f00f0ea0279a3bb5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-524cb7597af58d1691135b7d55d343e8813902a26eb961c58880b91ff7b6500132ff70654e1d7f4d208f2753802a4fdbbd9a5ae886b710e6f00f0ea0279a3bb5"' :
                                        'id="xs-injectables-links-module-AppModule-524cb7597af58d1691135b7d55d343e8813902a26eb961c58880b91ff7b6500132ff70654e1d7f4d208f2753802a4fdbbd9a5ae886b710e6f00f0ea0279a3bb5"' }>
                                        <li class="link">
                                            <a href="injectables/GanttService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GanttService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GraficoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GraficoService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/KanbanService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KanbanService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CustomRouteReuseStrategy.html" data-type="entity-link" >CustomRouteReuseStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/Grafico.html" data-type="entity-link" >Grafico</a>
                            </li>
                            <li class="link">
                                <a href="classes/Task.html" data-type="entity-link" >Task</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/EstadoService.html" data-type="entity-link" >EstadoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GanttService.html" data-type="entity-link" >GanttService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GraficoService.html" data-type="entity-link" >GraficoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/KanbanService.html" data-type="entity-link" >KanbanService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TabService.html" data-type="entity-link" >TabService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Tab.html" data-type="entity-link" >Tab</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});