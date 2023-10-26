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
                    <a href="index.html" data-type="index-link">tapmoney documentation</a>
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
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccountModule.html" data-type="entity-link" >AccountModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AccountModule-a3906c3d4732495b4fb6f47bde2c84d983de2f539b4a66725bf06f3dcd377a0f870c3e2a609528c480dba6b0e8b7840ca518e4dc32f7fc8989216318b36ca329"' : 'data-target="#xs-controllers-links-module-AccountModule-a3906c3d4732495b4fb6f47bde2c84d983de2f539b4a66725bf06f3dcd377a0f870c3e2a609528c480dba6b0e8b7840ca518e4dc32f7fc8989216318b36ca329"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AccountModule-a3906c3d4732495b4fb6f47bde2c84d983de2f539b4a66725bf06f3dcd377a0f870c3e2a609528c480dba6b0e8b7840ca518e4dc32f7fc8989216318b36ca329"' :
                                            'id="xs-controllers-links-module-AccountModule-a3906c3d4732495b4fb6f47bde2c84d983de2f539b4a66725bf06f3dcd377a0f870c3e2a609528c480dba6b0e8b7840ca518e4dc32f7fc8989216318b36ca329"' }>
                                            <li class="link">
                                                <a href="controllers/AccountController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AccountModule-a3906c3d4732495b4fb6f47bde2c84d983de2f539b4a66725bf06f3dcd377a0f870c3e2a609528c480dba6b0e8b7840ca518e4dc32f7fc8989216318b36ca329"' : 'data-target="#xs-injectables-links-module-AccountModule-a3906c3d4732495b4fb6f47bde2c84d983de2f539b4a66725bf06f3dcd377a0f870c3e2a609528c480dba6b0e8b7840ca518e4dc32f7fc8989216318b36ca329"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AccountModule-a3906c3d4732495b4fb6f47bde2c84d983de2f539b4a66725bf06f3dcd377a0f870c3e2a609528c480dba6b0e8b7840ca518e4dc32f7fc8989216318b36ca329"' :
                                        'id="xs-injectables-links-module-AccountModule-a3906c3d4732495b4fb6f47bde2c84d983de2f539b4a66725bf06f3dcd377a0f870c3e2a609528c480dba6b0e8b7840ca518e4dc32f7fc8989216318b36ca329"' }>
                                        <li class="link">
                                            <a href="injectables/AccountService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AdminModule-38b046dcb2acc52297959f325d87f8a2fe7605c5156a321164ad987a751280016a9fddc36d4bcc7f023d08699c082f5bcde8e448dca2c66ed13f5057d2845707"' : 'data-target="#xs-controllers-links-module-AdminModule-38b046dcb2acc52297959f325d87f8a2fe7605c5156a321164ad987a751280016a9fddc36d4bcc7f023d08699c082f5bcde8e448dca2c66ed13f5057d2845707"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminModule-38b046dcb2acc52297959f325d87f8a2fe7605c5156a321164ad987a751280016a9fddc36d4bcc7f023d08699c082f5bcde8e448dca2c66ed13f5057d2845707"' :
                                            'id="xs-controllers-links-module-AdminModule-38b046dcb2acc52297959f325d87f8a2fe7605c5156a321164ad987a751280016a9fddc36d4bcc7f023d08699c082f5bcde8e448dca2c66ed13f5057d2845707"' }>
                                            <li class="link">
                                                <a href="controllers/AdminController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AdminModule-38b046dcb2acc52297959f325d87f8a2fe7605c5156a321164ad987a751280016a9fddc36d4bcc7f023d08699c082f5bcde8e448dca2c66ed13f5057d2845707"' : 'data-target="#xs-injectables-links-module-AdminModule-38b046dcb2acc52297959f325d87f8a2fe7605c5156a321164ad987a751280016a9fddc36d4bcc7f023d08699c082f5bcde8e448dca2c66ed13f5057d2845707"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminModule-38b046dcb2acc52297959f325d87f8a2fe7605c5156a321164ad987a751280016a9fddc36d4bcc7f023d08699c082f5bcde8e448dca2c66ed13f5057d2845707"' :
                                        'id="xs-injectables-links-module-AdminModule-38b046dcb2acc52297959f325d87f8a2fe7605c5156a321164ad987a751280016a9fddc36d4bcc7f023d08699c082f5bcde8e448dca2c66ed13f5057d2845707"' }>
                                        <li class="link">
                                            <a href="injectables/AdminService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AirtimeModule.html" data-type="entity-link" >AirtimeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AirtimeModule-05140730af4a6551f94bae3678dcb039f5f4e8c57d8928cd9e93fbb30ccd3c7d89af846abcc70d1ad1d7a3037970789ca96bea4f949cf40ade9195ce36a796ed"' : 'data-target="#xs-controllers-links-module-AirtimeModule-05140730af4a6551f94bae3678dcb039f5f4e8c57d8928cd9e93fbb30ccd3c7d89af846abcc70d1ad1d7a3037970789ca96bea4f949cf40ade9195ce36a796ed"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AirtimeModule-05140730af4a6551f94bae3678dcb039f5f4e8c57d8928cd9e93fbb30ccd3c7d89af846abcc70d1ad1d7a3037970789ca96bea4f949cf40ade9195ce36a796ed"' :
                                            'id="xs-controllers-links-module-AirtimeModule-05140730af4a6551f94bae3678dcb039f5f4e8c57d8928cd9e93fbb30ccd3c7d89af846abcc70d1ad1d7a3037970789ca96bea4f949cf40ade9195ce36a796ed"' }>
                                            <li class="link">
                                                <a href="controllers/AirtimeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AirtimeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AirtimeModule-05140730af4a6551f94bae3678dcb039f5f4e8c57d8928cd9e93fbb30ccd3c7d89af846abcc70d1ad1d7a3037970789ca96bea4f949cf40ade9195ce36a796ed"' : 'data-target="#xs-injectables-links-module-AirtimeModule-05140730af4a6551f94bae3678dcb039f5f4e8c57d8928cd9e93fbb30ccd3c7d89af846abcc70d1ad1d7a3037970789ca96bea4f949cf40ade9195ce36a796ed"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AirtimeModule-05140730af4a6551f94bae3678dcb039f5f4e8c57d8928cd9e93fbb30ccd3c7d89af846abcc70d1ad1d7a3037970789ca96bea4f949cf40ade9195ce36a796ed"' :
                                        'id="xs-injectables-links-module-AirtimeModule-05140730af4a6551f94bae3678dcb039f5f4e8c57d8928cd9e93fbb30ccd3c7d89af846abcc70d1ad1d7a3037970789ca96bea4f949cf40ade9195ce36a796ed"' }>
                                        <li class="link">
                                            <a href="injectables/AirtimeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AirtimeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-ee04206b68f4f8d8468702dd7eaed7f69236b805a2b4b43cffc859e886e775101f3ed7671c43d5f272f0945dfdd3a04218c99b6f5b327005f664bf3e8fadaa39"' : 'data-target="#xs-controllers-links-module-AuthModule-ee04206b68f4f8d8468702dd7eaed7f69236b805a2b4b43cffc859e886e775101f3ed7671c43d5f272f0945dfdd3a04218c99b6f5b327005f664bf3e8fadaa39"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-ee04206b68f4f8d8468702dd7eaed7f69236b805a2b4b43cffc859e886e775101f3ed7671c43d5f272f0945dfdd3a04218c99b6f5b327005f664bf3e8fadaa39"' :
                                            'id="xs-controllers-links-module-AuthModule-ee04206b68f4f8d8468702dd7eaed7f69236b805a2b4b43cffc859e886e775101f3ed7671c43d5f272f0945dfdd3a04218c99b6f5b327005f664bf3e8fadaa39"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-ee04206b68f4f8d8468702dd7eaed7f69236b805a2b4b43cffc859e886e775101f3ed7671c43d5f272f0945dfdd3a04218c99b6f5b327005f664bf3e8fadaa39"' : 'data-target="#xs-injectables-links-module-AuthModule-ee04206b68f4f8d8468702dd7eaed7f69236b805a2b4b43cffc859e886e775101f3ed7671c43d5f272f0945dfdd3a04218c99b6f5b327005f664bf3e8fadaa39"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-ee04206b68f4f8d8468702dd7eaed7f69236b805a2b4b43cffc859e886e775101f3ed7671c43d5f272f0945dfdd3a04218c99b6f5b327005f664bf3e8fadaa39"' :
                                        'id="xs-injectables-links-module-AuthModule-ee04206b68f4f8d8468702dd7eaed7f69236b805a2b4b43cffc859e886e775101f3ed7671c43d5f272f0945dfdd3a04218c99b6f5b327005f664bf3e8fadaa39"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BankModule.html" data-type="entity-link" >BankModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-BankModule-ff40e557b12148c0c3dcd5b1abcef073c75c53984a81dfdfc65f9dfad800e0e478a6a48d7c5f6ef0e75710f01a867a3db068194d68c7969ee8fd931a6aaa00a7"' : 'data-target="#xs-controllers-links-module-BankModule-ff40e557b12148c0c3dcd5b1abcef073c75c53984a81dfdfc65f9dfad800e0e478a6a48d7c5f6ef0e75710f01a867a3db068194d68c7969ee8fd931a6aaa00a7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BankModule-ff40e557b12148c0c3dcd5b1abcef073c75c53984a81dfdfc65f9dfad800e0e478a6a48d7c5f6ef0e75710f01a867a3db068194d68c7969ee8fd931a6aaa00a7"' :
                                            'id="xs-controllers-links-module-BankModule-ff40e557b12148c0c3dcd5b1abcef073c75c53984a81dfdfc65f9dfad800e0e478a6a48d7c5f6ef0e75710f01a867a3db068194d68c7969ee8fd931a6aaa00a7"' }>
                                            <li class="link">
                                                <a href="controllers/BankController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BankController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-BankModule-ff40e557b12148c0c3dcd5b1abcef073c75c53984a81dfdfc65f9dfad800e0e478a6a48d7c5f6ef0e75710f01a867a3db068194d68c7969ee8fd931a6aaa00a7"' : 'data-target="#xs-injectables-links-module-BankModule-ff40e557b12148c0c3dcd5b1abcef073c75c53984a81dfdfc65f9dfad800e0e478a6a48d7c5f6ef0e75710f01a867a3db068194d68c7969ee8fd931a6aaa00a7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BankModule-ff40e557b12148c0c3dcd5b1abcef073c75c53984a81dfdfc65f9dfad800e0e478a6a48d7c5f6ef0e75710f01a867a3db068194d68c7969ee8fd931a6aaa00a7"' :
                                        'id="xs-injectables-links-module-BankModule-ff40e557b12148c0c3dcd5b1abcef073c75c53984a81dfdfc65f9dfad800e0e478a6a48d7c5f6ef0e75710f01a867a3db068194d68c7969ee8fd931a6aaa00a7"' }>
                                        <li class="link">
                                            <a href="injectables/BankService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BankService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ElectricitybillModule.html" data-type="entity-link" >ElectricitybillModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ElectricitybillModule-d5fd2ed0410ca39e56c34be692b7850904c4f70d4e150e030e7eb47eeb6928f1275777c9e1ca31126d0c826ad3bd60b3730f95f4cb28a69f38d6be3417ac8f33"' : 'data-target="#xs-controllers-links-module-ElectricitybillModule-d5fd2ed0410ca39e56c34be692b7850904c4f70d4e150e030e7eb47eeb6928f1275777c9e1ca31126d0c826ad3bd60b3730f95f4cb28a69f38d6be3417ac8f33"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ElectricitybillModule-d5fd2ed0410ca39e56c34be692b7850904c4f70d4e150e030e7eb47eeb6928f1275777c9e1ca31126d0c826ad3bd60b3730f95f4cb28a69f38d6be3417ac8f33"' :
                                            'id="xs-controllers-links-module-ElectricitybillModule-d5fd2ed0410ca39e56c34be692b7850904c4f70d4e150e030e7eb47eeb6928f1275777c9e1ca31126d0c826ad3bd60b3730f95f4cb28a69f38d6be3417ac8f33"' }>
                                            <li class="link">
                                                <a href="controllers/ElectricitybillController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ElectricitybillController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ElectricitybillModule-d5fd2ed0410ca39e56c34be692b7850904c4f70d4e150e030e7eb47eeb6928f1275777c9e1ca31126d0c826ad3bd60b3730f95f4cb28a69f38d6be3417ac8f33"' : 'data-target="#xs-injectables-links-module-ElectricitybillModule-d5fd2ed0410ca39e56c34be692b7850904c4f70d4e150e030e7eb47eeb6928f1275777c9e1ca31126d0c826ad3bd60b3730f95f4cb28a69f38d6be3417ac8f33"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ElectricitybillModule-d5fd2ed0410ca39e56c34be692b7850904c4f70d4e150e030e7eb47eeb6928f1275777c9e1ca31126d0c826ad3bd60b3730f95f4cb28a69f38d6be3417ac8f33"' :
                                        'id="xs-injectables-links-module-ElectricitybillModule-d5fd2ed0410ca39e56c34be692b7850904c4f70d4e150e030e7eb47eeb6928f1275777c9e1ca31126d0c826ad3bd60b3730f95f4cb28a69f38d6be3417ac8f33"' }>
                                        <li class="link">
                                            <a href="injectables/ElectricitybillService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ElectricitybillService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FlutterwaveModule.html" data-type="entity-link" >FlutterwaveModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-FlutterwaveModule-8e4a3f1710c17adc2b65bf3cbee210d362df018a58ace9417fcd5594bdc0cc325a5758a0d29dd1869d67b9b37478b63ae7a80717ac513ec0b3781c29ecf4a07e"' : 'data-target="#xs-controllers-links-module-FlutterwaveModule-8e4a3f1710c17adc2b65bf3cbee210d362df018a58ace9417fcd5594bdc0cc325a5758a0d29dd1869d67b9b37478b63ae7a80717ac513ec0b3781c29ecf4a07e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FlutterwaveModule-8e4a3f1710c17adc2b65bf3cbee210d362df018a58ace9417fcd5594bdc0cc325a5758a0d29dd1869d67b9b37478b63ae7a80717ac513ec0b3781c29ecf4a07e"' :
                                            'id="xs-controllers-links-module-FlutterwaveModule-8e4a3f1710c17adc2b65bf3cbee210d362df018a58ace9417fcd5594bdc0cc325a5758a0d29dd1869d67b9b37478b63ae7a80717ac513ec0b3781c29ecf4a07e"' }>
                                            <li class="link">
                                                <a href="controllers/FlutterwaveController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FlutterwaveController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FlutterwaveModule-8e4a3f1710c17adc2b65bf3cbee210d362df018a58ace9417fcd5594bdc0cc325a5758a0d29dd1869d67b9b37478b63ae7a80717ac513ec0b3781c29ecf4a07e"' : 'data-target="#xs-injectables-links-module-FlutterwaveModule-8e4a3f1710c17adc2b65bf3cbee210d362df018a58ace9417fcd5594bdc0cc325a5758a0d29dd1869d67b9b37478b63ae7a80717ac513ec0b3781c29ecf4a07e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FlutterwaveModule-8e4a3f1710c17adc2b65bf3cbee210d362df018a58ace9417fcd5594bdc0cc325a5758a0d29dd1869d67b9b37478b63ae7a80717ac513ec0b3781c29ecf4a07e"' :
                                        'id="xs-injectables-links-module-FlutterwaveModule-8e4a3f1710c17adc2b65bf3cbee210d362df018a58ace9417fcd5594bdc0cc325a5758a0d29dd1869d67b9b37478b63ae7a80717ac513ec0b3781c29ecf4a07e"' }>
                                        <li class="link">
                                            <a href="injectables/FlutterwaveService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FlutterwaveService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-HealthModule-59c76511db175f08689a0b28c797b2ad229ca9f6bcad86ab458607efe98e0a1f00595d88d15961c4a702affff927a499f1ac2642c2fc7af5586c376cf62e821c"' : 'data-target="#xs-controllers-links-module-HealthModule-59c76511db175f08689a0b28c797b2ad229ca9f6bcad86ab458607efe98e0a1f00595d88d15961c4a702affff927a499f1ac2642c2fc7af5586c376cf62e821c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-59c76511db175f08689a0b28c797b2ad229ca9f6bcad86ab458607efe98e0a1f00595d88d15961c4a702affff927a499f1ac2642c2fc7af5586c376cf62e821c"' :
                                            'id="xs-controllers-links-module-HealthModule-59c76511db175f08689a0b28c797b2ad229ca9f6bcad86ab458607efe98e0a1f00595d88d15961c4a702affff927a499f1ac2642c2fc7af5586c376cf62e821c"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LogModule.html" data-type="entity-link" >LogModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-LogModule-84666a2d4d984818343a0c48dd5fe52b996355c477afea763d1a24abf7cb85b1e96da2f681004b764c081494653373f3bffe51e0c9587e639130ece12f4f2988"' : 'data-target="#xs-controllers-links-module-LogModule-84666a2d4d984818343a0c48dd5fe52b996355c477afea763d1a24abf7cb85b1e96da2f681004b764c081494653373f3bffe51e0c9587e639130ece12f4f2988"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LogModule-84666a2d4d984818343a0c48dd5fe52b996355c477afea763d1a24abf7cb85b1e96da2f681004b764c081494653373f3bffe51e0c9587e639130ece12f4f2988"' :
                                            'id="xs-controllers-links-module-LogModule-84666a2d4d984818343a0c48dd5fe52b996355c477afea763d1a24abf7cb85b1e96da2f681004b764c081494653373f3bffe51e0c9587e639130ece12f4f2988"' }>
                                            <li class="link">
                                                <a href="controllers/LogController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LogModule-84666a2d4d984818343a0c48dd5fe52b996355c477afea763d1a24abf7cb85b1e96da2f681004b764c081494653373f3bffe51e0c9587e639130ece12f4f2988"' : 'data-target="#xs-injectables-links-module-LogModule-84666a2d4d984818343a0c48dd5fe52b996355c477afea763d1a24abf7cb85b1e96da2f681004b764c081494653373f3bffe51e0c9587e639130ece12f4f2988"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LogModule-84666a2d4d984818343a0c48dd5fe52b996355c477afea763d1a24abf7cb85b1e96da2f681004b764c081494653373f3bffe51e0c9587e639130ece12f4f2988"' :
                                        'id="xs-injectables-links-module-LogModule-84666a2d4d984818343a0c48dd5fe52b996355c477afea763d1a24abf7cb85b1e96da2f681004b764c081494653373f3bffe51e0c9587e639130ece12f4f2988"' }>
                                        <li class="link">
                                            <a href="injectables/CustomLogger.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomLogger</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LogService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MobiledataModule.html" data-type="entity-link" >MobiledataModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-MobiledataModule-e8e8bdaffd7c0b827ba9431ea25d236b9de28acc370141f8f1f5b128ed6bf504aa253ea4a716401474e93e5957fb4f0106be76587eb519d43790d14773b87186"' : 'data-target="#xs-controllers-links-module-MobiledataModule-e8e8bdaffd7c0b827ba9431ea25d236b9de28acc370141f8f1f5b128ed6bf504aa253ea4a716401474e93e5957fb4f0106be76587eb519d43790d14773b87186"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MobiledataModule-e8e8bdaffd7c0b827ba9431ea25d236b9de28acc370141f8f1f5b128ed6bf504aa253ea4a716401474e93e5957fb4f0106be76587eb519d43790d14773b87186"' :
                                            'id="xs-controllers-links-module-MobiledataModule-e8e8bdaffd7c0b827ba9431ea25d236b9de28acc370141f8f1f5b128ed6bf504aa253ea4a716401474e93e5957fb4f0106be76587eb519d43790d14773b87186"' }>
                                            <li class="link">
                                                <a href="controllers/MobiledataController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MobiledataController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MobiledataModule-e8e8bdaffd7c0b827ba9431ea25d236b9de28acc370141f8f1f5b128ed6bf504aa253ea4a716401474e93e5957fb4f0106be76587eb519d43790d14773b87186"' : 'data-target="#xs-injectables-links-module-MobiledataModule-e8e8bdaffd7c0b827ba9431ea25d236b9de28acc370141f8f1f5b128ed6bf504aa253ea4a716401474e93e5957fb4f0106be76587eb519d43790d14773b87186"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MobiledataModule-e8e8bdaffd7c0b827ba9431ea25d236b9de28acc370141f8f1f5b128ed6bf504aa253ea4a716401474e93e5957fb4f0106be76587eb519d43790d14773b87186"' :
                                        'id="xs-injectables-links-module-MobiledataModule-e8e8bdaffd7c0b827ba9431ea25d236b9de28acc370141f8f1f5b128ed6bf504aa253ea4a716401474e93e5957fb4f0106be76587eb519d43790d14773b87186"' }>
                                        <li class="link">
                                            <a href="injectables/MobiledataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MobiledataService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MonnifyModule.html" data-type="entity-link" >MonnifyModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-MonnifyModule-2ba3820be9a087178abeed0664347f64dcf7d827ba9b89ad66f4ec0195ccef3ed14576f3c3452e0711ba099092a78f1d74420776affb197a51a9507972a7cc8e"' : 'data-target="#xs-controllers-links-module-MonnifyModule-2ba3820be9a087178abeed0664347f64dcf7d827ba9b89ad66f4ec0195ccef3ed14576f3c3452e0711ba099092a78f1d74420776affb197a51a9507972a7cc8e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MonnifyModule-2ba3820be9a087178abeed0664347f64dcf7d827ba9b89ad66f4ec0195ccef3ed14576f3c3452e0711ba099092a78f1d74420776affb197a51a9507972a7cc8e"' :
                                            'id="xs-controllers-links-module-MonnifyModule-2ba3820be9a087178abeed0664347f64dcf7d827ba9b89ad66f4ec0195ccef3ed14576f3c3452e0711ba099092a78f1d74420776affb197a51a9507972a7cc8e"' }>
                                            <li class="link">
                                                <a href="controllers/MonnifyController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MonnifyController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MonnifyModule-2ba3820be9a087178abeed0664347f64dcf7d827ba9b89ad66f4ec0195ccef3ed14576f3c3452e0711ba099092a78f1d74420776affb197a51a9507972a7cc8e"' : 'data-target="#xs-injectables-links-module-MonnifyModule-2ba3820be9a087178abeed0664347f64dcf7d827ba9b89ad66f4ec0195ccef3ed14576f3c3452e0711ba099092a78f1d74420776affb197a51a9507972a7cc8e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MonnifyModule-2ba3820be9a087178abeed0664347f64dcf7d827ba9b89ad66f4ec0195ccef3ed14576f3c3452e0711ba099092a78f1d74420776affb197a51a9507972a7cc8e"' :
                                        'id="xs-injectables-links-module-MonnifyModule-2ba3820be9a087178abeed0664347f64dcf7d827ba9b89ad66f4ec0195ccef3ed14576f3c3452e0711ba099092a78f1d74420776affb197a51a9507972a7cc8e"' }>
                                        <li class="link">
                                            <a href="injectables/MonnifyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MonnifyService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsModule.html" data-type="entity-link" >SettingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SettingsModule-439af2f5952068dc68a6d7cd1b6fde4ea42719cac2649b5e3440c4dd0da889310bb6c631ceea1684ef2894786feeb184087318ff577f7e79617230a2a5af441c"' : 'data-target="#xs-controllers-links-module-SettingsModule-439af2f5952068dc68a6d7cd1b6fde4ea42719cac2649b5e3440c4dd0da889310bb6c631ceea1684ef2894786feeb184087318ff577f7e79617230a2a5af441c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SettingsModule-439af2f5952068dc68a6d7cd1b6fde4ea42719cac2649b5e3440c4dd0da889310bb6c631ceea1684ef2894786feeb184087318ff577f7e79617230a2a5af441c"' :
                                            'id="xs-controllers-links-module-SettingsModule-439af2f5952068dc68a6d7cd1b6fde4ea42719cac2649b5e3440c4dd0da889310bb6c631ceea1684ef2894786feeb184087318ff577f7e79617230a2a5af441c"' }>
                                            <li class="link">
                                                <a href="controllers/SettingsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SettingsModule-439af2f5952068dc68a6d7cd1b6fde4ea42719cac2649b5e3440c4dd0da889310bb6c631ceea1684ef2894786feeb184087318ff577f7e79617230a2a5af441c"' : 'data-target="#xs-injectables-links-module-SettingsModule-439af2f5952068dc68a6d7cd1b6fde4ea42719cac2649b5e3440c4dd0da889310bb6c631ceea1684ef2894786feeb184087318ff577f7e79617230a2a5af441c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SettingsModule-439af2f5952068dc68a6d7cd1b6fde4ea42719cac2649b5e3440c4dd0da889310bb6c631ceea1684ef2894786feeb184087318ff577f7e79617230a2a5af441c"' :
                                        'id="xs-injectables-links-module-SettingsModule-439af2f5952068dc68a6d7cd1b6fde4ea42719cac2649b5e3440c4dd0da889310bb6c631ceea1684ef2894786feeb184087318ff577f7e79617230a2a5af441c"' }>
                                        <li class="link">
                                            <a href="injectables/SettingsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SmsModule.html" data-type="entity-link" >SmsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SmsModule-d8e570ec68e2c30f63ce76fa2cff3f5e6dbc88ba3d7add21fcd99306931698f089896f15d9db6296f724e4c1f7e756163935b8d71524bb933009818f7cd50cb6"' : 'data-target="#xs-controllers-links-module-SmsModule-d8e570ec68e2c30f63ce76fa2cff3f5e6dbc88ba3d7add21fcd99306931698f089896f15d9db6296f724e4c1f7e756163935b8d71524bb933009818f7cd50cb6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SmsModule-d8e570ec68e2c30f63ce76fa2cff3f5e6dbc88ba3d7add21fcd99306931698f089896f15d9db6296f724e4c1f7e756163935b8d71524bb933009818f7cd50cb6"' :
                                            'id="xs-controllers-links-module-SmsModule-d8e570ec68e2c30f63ce76fa2cff3f5e6dbc88ba3d7add21fcd99306931698f089896f15d9db6296f724e4c1f7e756163935b8d71524bb933009818f7cd50cb6"' }>
                                            <li class="link">
                                                <a href="controllers/SmsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SmsModule-d8e570ec68e2c30f63ce76fa2cff3f5e6dbc88ba3d7add21fcd99306931698f089896f15d9db6296f724e4c1f7e756163935b8d71524bb933009818f7cd50cb6"' : 'data-target="#xs-injectables-links-module-SmsModule-d8e570ec68e2c30f63ce76fa2cff3f5e6dbc88ba3d7add21fcd99306931698f089896f15d9db6296f724e4c1f7e756163935b8d71524bb933009818f7cd50cb6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SmsModule-d8e570ec68e2c30f63ce76fa2cff3f5e6dbc88ba3d7add21fcd99306931698f089896f15d9db6296f724e4c1f7e756163935b8d71524bb933009818f7cd50cb6"' :
                                        'id="xs-injectables-links-module-SmsModule-d8e570ec68e2c30f63ce76fa2cff3f5e6dbc88ba3d7add21fcd99306931698f089896f15d9db6296f724e4c1f7e756163935b8d71524bb933009818f7cd50cb6"' }>
                                        <li class="link">
                                            <a href="injectables/SmsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TransactionsModule.html" data-type="entity-link" >TransactionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TransactionsModule-2dcee804893ddc02c65cc1f94fc30065ea6fe1c3d353b98fef52ce50b184c3339c6bfdcbfb611b6e0e93d3f4df0c3d5a5670d77265ae1714bff085b28199f204"' : 'data-target="#xs-controllers-links-module-TransactionsModule-2dcee804893ddc02c65cc1f94fc30065ea6fe1c3d353b98fef52ce50b184c3339c6bfdcbfb611b6e0e93d3f4df0c3d5a5670d77265ae1714bff085b28199f204"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TransactionsModule-2dcee804893ddc02c65cc1f94fc30065ea6fe1c3d353b98fef52ce50b184c3339c6bfdcbfb611b6e0e93d3f4df0c3d5a5670d77265ae1714bff085b28199f204"' :
                                            'id="xs-controllers-links-module-TransactionsModule-2dcee804893ddc02c65cc1f94fc30065ea6fe1c3d353b98fef52ce50b184c3339c6bfdcbfb611b6e0e93d3f4df0c3d5a5670d77265ae1714bff085b28199f204"' }>
                                            <li class="link">
                                                <a href="controllers/TransactionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TransactionsModule-2dcee804893ddc02c65cc1f94fc30065ea6fe1c3d353b98fef52ce50b184c3339c6bfdcbfb611b6e0e93d3f4df0c3d5a5670d77265ae1714bff085b28199f204"' : 'data-target="#xs-injectables-links-module-TransactionsModule-2dcee804893ddc02c65cc1f94fc30065ea6fe1c3d353b98fef52ce50b184c3339c6bfdcbfb611b6e0e93d3f4df0c3d5a5670d77265ae1714bff085b28199f204"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TransactionsModule-2dcee804893ddc02c65cc1f94fc30065ea6fe1c3d353b98fef52ce50b184c3339c6bfdcbfb611b6e0e93d3f4df0c3d5a5670d77265ae1714bff085b28199f204"' :
                                        'id="xs-injectables-links-module-TransactionsModule-2dcee804893ddc02c65cc1f94fc30065ea6fe1c3d353b98fef52ce50b184c3339c6bfdcbfb611b6e0e93d3f4df0c3d5a5670d77265ae1714bff085b28199f204"' }>
                                        <li class="link">
                                            <a href="injectables/TransactionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TransfersModule.html" data-type="entity-link" >TransfersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TransfersModule-1bce828bbb99051809021660aeda6e2e0390832ad4eb150316e70a85acc07b731e158b2b9103826f906d1948aaf72d95bde448ec8eb37bb38babc5259676b899"' : 'data-target="#xs-controllers-links-module-TransfersModule-1bce828bbb99051809021660aeda6e2e0390832ad4eb150316e70a85acc07b731e158b2b9103826f906d1948aaf72d95bde448ec8eb37bb38babc5259676b899"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TransfersModule-1bce828bbb99051809021660aeda6e2e0390832ad4eb150316e70a85acc07b731e158b2b9103826f906d1948aaf72d95bde448ec8eb37bb38babc5259676b899"' :
                                            'id="xs-controllers-links-module-TransfersModule-1bce828bbb99051809021660aeda6e2e0390832ad4eb150316e70a85acc07b731e158b2b9103826f906d1948aaf72d95bde448ec8eb37bb38babc5259676b899"' }>
                                            <li class="link">
                                                <a href="controllers/TransfersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransfersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TransfersModule-1bce828bbb99051809021660aeda6e2e0390832ad4eb150316e70a85acc07b731e158b2b9103826f906d1948aaf72d95bde448ec8eb37bb38babc5259676b899"' : 'data-target="#xs-injectables-links-module-TransfersModule-1bce828bbb99051809021660aeda6e2e0390832ad4eb150316e70a85acc07b731e158b2b9103826f906d1948aaf72d95bde448ec8eb37bb38babc5259676b899"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TransfersModule-1bce828bbb99051809021660aeda6e2e0390832ad4eb150316e70a85acc07b731e158b2b9103826f906d1948aaf72d95bde448ec8eb37bb38babc5259676b899"' :
                                        'id="xs-injectables-links-module-TransfersModule-1bce828bbb99051809021660aeda6e2e0390832ad4eb150316e70a85acc07b731e158b2b9103826f906d1948aaf72d95bde448ec8eb37bb38babc5259676b899"' }>
                                        <li class="link">
                                            <a href="injectables/TransfersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransfersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TvsubscriptionModule.html" data-type="entity-link" >TvsubscriptionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TvsubscriptionModule-6ae88c079106f65a00b237e0975c221bc9024cde4365370668cc79f3738d5bf26c81cc94b43ee2ad213e9d720f183fe41431ca2cb57c058003137c2fb85e1bd8"' : 'data-target="#xs-controllers-links-module-TvsubscriptionModule-6ae88c079106f65a00b237e0975c221bc9024cde4365370668cc79f3738d5bf26c81cc94b43ee2ad213e9d720f183fe41431ca2cb57c058003137c2fb85e1bd8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TvsubscriptionModule-6ae88c079106f65a00b237e0975c221bc9024cde4365370668cc79f3738d5bf26c81cc94b43ee2ad213e9d720f183fe41431ca2cb57c058003137c2fb85e1bd8"' :
                                            'id="xs-controllers-links-module-TvsubscriptionModule-6ae88c079106f65a00b237e0975c221bc9024cde4365370668cc79f3738d5bf26c81cc94b43ee2ad213e9d720f183fe41431ca2cb57c058003137c2fb85e1bd8"' }>
                                            <li class="link">
                                                <a href="controllers/TvsubscriptionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TvsubscriptionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TvsubscriptionModule-6ae88c079106f65a00b237e0975c221bc9024cde4365370668cc79f3738d5bf26c81cc94b43ee2ad213e9d720f183fe41431ca2cb57c058003137c2fb85e1bd8"' : 'data-target="#xs-injectables-links-module-TvsubscriptionModule-6ae88c079106f65a00b237e0975c221bc9024cde4365370668cc79f3738d5bf26c81cc94b43ee2ad213e9d720f183fe41431ca2cb57c058003137c2fb85e1bd8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TvsubscriptionModule-6ae88c079106f65a00b237e0975c221bc9024cde4365370668cc79f3738d5bf26c81cc94b43ee2ad213e9d720f183fe41431ca2cb57c058003137c2fb85e1bd8"' :
                                        'id="xs-injectables-links-module-TvsubscriptionModule-6ae88c079106f65a00b237e0975c221bc9024cde4365370668cc79f3738d5bf26c81cc94b43ee2ad213e9d720f183fe41431ca2cb57c058003137c2fb85e1bd8"' }>
                                        <li class="link">
                                            <a href="injectables/TvsubscriptionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TvsubscriptionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TwillioModule.html" data-type="entity-link" >TwillioModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TwillioModule-9752f50375fc5251df41fb2fbb7e3cfe4e258ce89c03dfcc7f7c1ad62689bf3618e4ad8cd2acbdc86e55ba8fcd2dd5c5179fce153591198c3bd3fa1b5ac3daf6"' : 'data-target="#xs-controllers-links-module-TwillioModule-9752f50375fc5251df41fb2fbb7e3cfe4e258ce89c03dfcc7f7c1ad62689bf3618e4ad8cd2acbdc86e55ba8fcd2dd5c5179fce153591198c3bd3fa1b5ac3daf6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TwillioModule-9752f50375fc5251df41fb2fbb7e3cfe4e258ce89c03dfcc7f7c1ad62689bf3618e4ad8cd2acbdc86e55ba8fcd2dd5c5179fce153591198c3bd3fa1b5ac3daf6"' :
                                            'id="xs-controllers-links-module-TwillioModule-9752f50375fc5251df41fb2fbb7e3cfe4e258ce89c03dfcc7f7c1ad62689bf3618e4ad8cd2acbdc86e55ba8fcd2dd5c5179fce153591198c3bd3fa1b5ac3daf6"' }>
                                            <li class="link">
                                                <a href="controllers/TwillioController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwillioController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TwillioModule-9752f50375fc5251df41fb2fbb7e3cfe4e258ce89c03dfcc7f7c1ad62689bf3618e4ad8cd2acbdc86e55ba8fcd2dd5c5179fce153591198c3bd3fa1b5ac3daf6"' : 'data-target="#xs-injectables-links-module-TwillioModule-9752f50375fc5251df41fb2fbb7e3cfe4e258ce89c03dfcc7f7c1ad62689bf3618e4ad8cd2acbdc86e55ba8fcd2dd5c5179fce153591198c3bd3fa1b5ac3daf6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TwillioModule-9752f50375fc5251df41fb2fbb7e3cfe4e258ce89c03dfcc7f7c1ad62689bf3618e4ad8cd2acbdc86e55ba8fcd2dd5c5179fce153591198c3bd3fa1b5ac3daf6"' :
                                        'id="xs-injectables-links-module-TwillioModule-9752f50375fc5251df41fb2fbb7e3cfe4e258ce89c03dfcc7f7c1ad62689bf3618e4ad8cd2acbdc86e55ba8fcd2dd5c5179fce153591198c3bd3fa1b5ac3daf6"' }>
                                        <li class="link">
                                            <a href="injectables/TwillioService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwillioService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-8a0a4370d02329c4cb8577859ad627df928b146b2b965b554172e7e76edd2cb8e40f2c1096ece7b71d93459883f3cec52287b36f35c7b7e3042e77d8c26fac27"' : 'data-target="#xs-controllers-links-module-UserModule-8a0a4370d02329c4cb8577859ad627df928b146b2b965b554172e7e76edd2cb8e40f2c1096ece7b71d93459883f3cec52287b36f35c7b7e3042e77d8c26fac27"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-8a0a4370d02329c4cb8577859ad627df928b146b2b965b554172e7e76edd2cb8e40f2c1096ece7b71d93459883f3cec52287b36f35c7b7e3042e77d8c26fac27"' :
                                            'id="xs-controllers-links-module-UserModule-8a0a4370d02329c4cb8577859ad627df928b146b2b965b554172e7e76edd2cb8e40f2c1096ece7b71d93459883f3cec52287b36f35c7b7e3042e77d8c26fac27"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-8a0a4370d02329c4cb8577859ad627df928b146b2b965b554172e7e76edd2cb8e40f2c1096ece7b71d93459883f3cec52287b36f35c7b7e3042e77d8c26fac27"' : 'data-target="#xs-injectables-links-module-UserModule-8a0a4370d02329c4cb8577859ad627df928b146b2b965b554172e7e76edd2cb8e40f2c1096ece7b71d93459883f3cec52287b36f35c7b7e3042e77d8c26fac27"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-8a0a4370d02329c4cb8577859ad627df928b146b2b965b554172e7e76edd2cb8e40f2c1096ece7b71d93459883f3cec52287b36f35c7b7e3042e77d8c26fac27"' :
                                        'id="xs-injectables-links-module-UserModule-8a0a4370d02329c4cb8577859ad627df928b146b2b965b554172e7e76edd2cb8e40f2c1096ece7b71d93459883f3cec52287b36f35c7b7e3042e77d8c26fac27"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WalletModule.html" data-type="entity-link" >WalletModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-WalletModule-4a4b16a1741b6d9fdb535f144545aa68bef1decd8e2a882dcd86481a4d171d8d9b4f2e4405a8fc7ecdc66712296bf3afb674ecd3acb2a1b296f9fd64dee71647"' : 'data-target="#xs-controllers-links-module-WalletModule-4a4b16a1741b6d9fdb535f144545aa68bef1decd8e2a882dcd86481a4d171d8d9b4f2e4405a8fc7ecdc66712296bf3afb674ecd3acb2a1b296f9fd64dee71647"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-WalletModule-4a4b16a1741b6d9fdb535f144545aa68bef1decd8e2a882dcd86481a4d171d8d9b4f2e4405a8fc7ecdc66712296bf3afb674ecd3acb2a1b296f9fd64dee71647"' :
                                            'id="xs-controllers-links-module-WalletModule-4a4b16a1741b6d9fdb535f144545aa68bef1decd8e2a882dcd86481a4d171d8d9b4f2e4405a8fc7ecdc66712296bf3afb674ecd3acb2a1b296f9fd64dee71647"' }>
                                            <li class="link">
                                                <a href="controllers/WalletController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WalletController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-WalletModule-4a4b16a1741b6d9fdb535f144545aa68bef1decd8e2a882dcd86481a4d171d8d9b4f2e4405a8fc7ecdc66712296bf3afb674ecd3acb2a1b296f9fd64dee71647"' : 'data-target="#xs-injectables-links-module-WalletModule-4a4b16a1741b6d9fdb535f144545aa68bef1decd8e2a882dcd86481a4d171d8d9b4f2e4405a8fc7ecdc66712296bf3afb674ecd3acb2a1b296f9fd64dee71647"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WalletModule-4a4b16a1741b6d9fdb535f144545aa68bef1decd8e2a882dcd86481a4d171d8d9b4f2e4405a8fc7ecdc66712296bf3afb674ecd3acb2a1b296f9fd64dee71647"' :
                                        'id="xs-injectables-links-module-WalletModule-4a4b16a1741b6d9fdb535f144545aa68bef1decd8e2a882dcd86481a4d171d8d9b4f2e4405a8fc7ecdc66712296bf3afb674ecd3acb2a1b296f9fd64dee71647"' }>
                                        <li class="link">
                                            <a href="injectables/WalletService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WalletService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/InternetController.html" data-type="entity-link" >InternetController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Account.html" data-type="entity-link" >Account</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Airtime.html" data-type="entity-link" >Airtime</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Log.html" data-type="entity-link" >Log</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Setting.html" data-type="entity-link" >Setting</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Transaction.html" data-type="entity-link" >Transaction</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Transfer.html" data-type="entity-link" >Transfer</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Wallet.html" data-type="entity-link" >Wallet</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Admin.html" data-type="entity-link" >Admin</a>
                            </li>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthorizeDepositData.html" data-type="entity-link" >AuthorizeDepositData</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthorizeDepositDto.html" data-type="entity-link" >AuthorizeDepositDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Bank.html" data-type="entity-link" >Bank</a>
                            </li>
                            <li class="link">
                                <a href="classes/BuyAirtimeDto.html" data-type="entity-link" >BuyAirtimeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConfirmPhoneNumberDto.html" data-type="entity-link" >ConfirmPhoneNumberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAccountDto.html" data-type="entity-link" >CreateAccountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAdminDto.html" data-type="entity-link" >CreateAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAirtimeDto.html" data-type="entity-link" >CreateAirtimeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthDto.html" data-type="entity-link" >CreateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBillDto.html" data-type="entity-link" >CreateBillDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateElectricitybillDto.html" data-type="entity-link" >CreateElectricitybillDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateHealthDto.html" data-type="entity-link" >CreateHealthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLogDto.html" data-type="entity-link" >CreateLogDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMobiledatumDto.html" data-type="entity-link" >CreateMobiledatumDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMonnifyDto.html" data-type="entity-link" >CreateMonnifyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSettingDto.html" data-type="entity-link" >CreateSettingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTransactionDto.html" data-type="entity-link" >CreateTransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTransferDto.html" data-type="entity-link" >CreateTransferDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTvsubscriptionDto.html" data-type="entity-link" >CreateTvsubscriptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTwillioDto.html" data-type="entity-link" >CreateTwillioDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateWalletDto.html" data-type="entity-link" >CreateWalletDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseLogger.html" data-type="entity-link" >DatabaseLogger</a>
                            </li>
                            <li class="link">
                                <a href="classes/Electricitybill.html" data-type="entity-link" >Electricitybill</a>
                            </li>
                            <li class="link">
                                <a href="classes/Flutterwave.html" data-type="entity-link" >Flutterwave</a>
                            </li>
                            <li class="link">
                                <a href="classes/Health.html" data-type="entity-link" >Health</a>
                            </li>
                            <li class="link">
                                <a href="classes/InitiateDepositDto.html" data-type="entity-link" >InitiateDepositDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/InitiateWithdrawalData.html" data-type="entity-link" >InitiateWithdrawalData</a>
                            </li>
                            <li class="link">
                                <a href="classes/InitiateWithdrawalDto.html" data-type="entity-link" >InitiateWithdrawalDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Mobiledatum.html" data-type="entity-link" >Mobiledatum</a>
                            </li>
                            <li class="link">
                                <a href="classes/Monnify.html" data-type="entity-link" >Monnify</a>
                            </li>
                            <li class="link">
                                <a href="classes/Sm.html" data-type="entity-link" >Sm</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tvsubscription.html" data-type="entity-link" >Tvsubscription</a>
                            </li>
                            <li class="link">
                                <a href="classes/Twillio.html" data-type="entity-link" >Twillio</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAccountDto.html" data-type="entity-link" >UpdateAccountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAdminDto.html" data-type="entity-link" >UpdateAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAirtimeDto.html" data-type="entity-link" >UpdateAirtimeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAuthDto.html" data-type="entity-link" >UpdateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateElectricitybillDto.html" data-type="entity-link" >UpdateElectricitybillDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateHealthDto.html" data-type="entity-link" >UpdateHealthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLogDto.html" data-type="entity-link" >UpdateLogDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMobiledatumDto.html" data-type="entity-link" >UpdateMobiledatumDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMonnifyDto.html" data-type="entity-link" >UpdateMonnifyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSettingDto.html" data-type="entity-link" >UpdateSettingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTransactionDto.html" data-type="entity-link" >UpdateTransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTransferDto.html" data-type="entity-link" >UpdateTransferDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTvsubscriptionDto.html" data-type="entity-link" >UpdateTvsubscriptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTwillioDto.html" data-type="entity-link" >UpdateTwillioDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateWalletDto.html" data-type="entity-link" >UpdateWalletDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UssdDepositData.html" data-type="entity-link" >UssdDepositData</a>
                            </li>
                            <li class="link">
                                <a href="classes/UssdDepositDto.html" data-type="entity-link" >UssdDepositDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidateAccountDto.html" data-type="entity-link" >ValidateAccountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidateAirtimeDto.html" data-type="entity-link" >ValidateAirtimeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidateDepositDto.html" data-type="entity-link" >ValidateDepositDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyAccountNumberDto.html" data-type="entity-link" >VerifyAccountNumberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyBvnDto.html" data-type="entity-link" >VerifyBvnDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CustomLogger.html" data-type="entity-link" >CustomLogger</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InternetService.html" data-type="entity-link" >InternetService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGaurd.html" data-type="entity-link" >JwtAuthGaurd</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGaurd.html" data-type="entity-link" >LocalAuthGaurd</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ReturnTypeContainer.html" data-type="entity-link" >ReturnTypeContainer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInterface.html" data-type="entity-link" >UserInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Users.html" data-type="entity-link" >Users</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});