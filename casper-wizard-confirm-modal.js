/*
  - Copyright (c) 2014-2016 Cloudware S.A. All rights reserved.
  -
  - This file is part of casper-wizard.
  -
  - casper-wizard is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as published by
  - the Free Software Foundation, either version 3 of the License, or
  - (at your option) any later version.
  -
  - casper-wizard  is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with casper-wizard.  If not, see <http://www.gnu.org/licenses/>.
  -
 */

import { CasperWizard } from './casper-wizard.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { Casper } from '@cloudware-casper/casper-common-ui/casper-i18n-behavior.js';

class ConfirmWizardConfirmModal extends Casper.I18n(CasperWizard) {
  static get template () {
    return html`
      <style>
        .container {
          display: flex;
        }

        .all_width {
          width: 100%;
        }

        casper-wizard-page .pagetitle {
          display: none;
        }

        .content {
          font-size: 18px;
        }

        .errors_list {
          padding: 0 30px;
          color: var(--dark-theme-background-color);
        }

        .errors_list > li {
          padding: 10px;
          border-bottom: 1px var(--dark-theme-background-color) solid;
          margin-bottom: 4px;
        }

      </style>

      <casper-wizard-page id="confirm" hide-title next$="[[accept]]" previous$="[[reject]]">
        <div class="content"></div>
      </casper-wizard-page>
    `;
  }

  static get is () {
    return 'casper-wizard-confirm-modal';
  }

  static get properties () {
    return {
      options: {
        type: Object,
        value: function() {
          return {};
        }
      },
      icon: {
        type: String,
        value: 'exclamation'
      },
      accountantPassword: {
        notify: true,
        type: String
      },
      needsPassword: {
        type: Boolean,
        value: false
      }
    };
  }

  ready () {
    super.ready();
    this.addEventListener('accept-modal', () => this._resolve && this._resolve({ ok: true }) );
    this.addEventListener('reject-modal', () => this._reject && this._reject() );
    this.defaultOptions = {
      message: 'Tem a certeza que pretende prosseguir?',
      accept: 'sim',
      reject: 'não'
    };

    this.defaultOverrideWizardDimensions = {
      width: '350px',
      height: '200px'
    };

    this.defaultOverrideWizardButtons = {
      previous: {
        backgroundColor: '#E5E5E5',
        color: '#A9A9A9',
        display: 'flex',
        border: 'none'
      },
      next: {
        backgroundColor: '#EF5350',
        display: 'flex'
      }
    };

    this.setOptions({});

  }

  setOptions (options) {

    const wizardDimensions = {...this.defaultOverrideWizardDimensions, ...options.overrideWizardDimensions};
    // Changed functionality to merge button options, not replace
    const wizardButtons = options.overrideWizardButtons != undefined ? {
      previous: {...this.defaultOverrideWizardButtons.previous, ...options.overrideWizardButtons.previous},
      next: {...this.defaultOverrideWizardButtons.next, ...options.overrideWizardButtons.next},
    } : this.defaultOverrideWizardButtons;

    this._closeButton.style.visibility = 'hidden';

    this.overrideWizardDimensions(wizardDimensions);
    if ( options && options.hideReject && wizardButtons && wizardButtons.previous ) {
      wizardButtons.previous.display = 'none';
    }
    this.overrideWizardButtons(wizardButtons);

    super.setOptions({...this.defaultOptions, ...options});
    if ( options.title ) {
      super.setTitle(options.title);
    }
  }

  connectedCallback () {
    super.connectedCallback();
    const content = this.shadowRoot.querySelector('.content');
    content.innerHTML = this.options.message;
    this.$.confirm.setAttribute("next", this.options.accept);
    this.$.confirm.setAttribute("previous", this.options.reject);
    this.appendPagesAndActivate(0);
    this.enablePrevious();
  }

  open () {
    super.open();
  }

  connection () {
    return new Promise(
      function (resolve, reject) {
        this.open();
        this._resolve = resolve;
        this._reject = reject;
      }.bind(this)
    );
  }

  _gotoPreviousPage () {
    this.dispatchEvent(new CustomEvent('reject-modal', { bubbles: true, composed: true }));
    this.close();
  }

  _gotoNextPage () {
    this.dispatchEvent(new CustomEvent('accept-modal', { bubbles: true, composed: true }));
    this.close();
  }

  isValid () {
   return true;
  }
}

window.customElements.define(ConfirmWizardConfirmModal.is, ConfirmWizardConfirmModal);
