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

import './casper-wizard-page.js';
import '@polymer/iron-icon/iron-icon.js';
import '@casper2020/casper-icons/casper-icons.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class CasperWizardStatusPage extends CasperWizardPage {
  static get template() {
    return html`
      <style>
        :host {
          width: 100%;
          height: 100%;
          background: var(--surface-color, #fff);
          border-radius: 10px;
        }

        casper-wizard-page {
          height: 100%;
          display: grid;
          grid-template-rows: 42px 1fr;
        }

        .container-error {
          display: flex;
          padding: 0 50px;
          align-items: center;
          flex-direction: column;
        }

        .error-icon-container {
          margin-bottom: 10px;
        }

        .error-message, .custom-message {
          margin: 0;
          color: grey;
          display: flex;
          font-size: 16px;
          font-weight: 500;
          text-align: center;
          align-items: center;
          white-space: pre-line;
          word-break: break-word;
          flex-direction: column;
        }

        .custom-message {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        casper-notice {
          width: 100%;
          align-self: flex-end;
        }

        iron-icon {
          fill: var(--primary-color);
          --iron-icon-height: 100px;
          --iron-icon-width: 100px;
        }

         .error-icon {
          fill: var(--error-color);
          --iron-icon-height: 100px;
          --iron-icon-width: 100px;
        }

        .error-message h2 {
          color: grey;
          margin-top: 4px;
          margin-bottom: 15px;
        }

        .hide {
          display: none;
        }

        .fill {
          height: 100%;
        }

      </style>

      <casper-wizard-page page-title="Resultado operação">
        <div id="customHtml" class="hide fill">
        </div>
        <div id="errorPanel" class="container-error">
          <div class="error-icon-container">
            <iron-icon icon="[[icon]]" class="error-icon" id="statusIcon"></iron-icon>
          </div>
          <div class="error-message">
            <h2 id="title">[[title]]</h2>
            <div id="errorMessage"></div>
          </div>
        </div>
      </casper-wizard-page>
    `;
  }

  static get is () {
    return 'casper-wizard-status-page';
  }

  static get properties () {
    return {
      pageTitle: {
        type: String
      },
      title: {
        type: String,
        value: 'Erro'
      },
      message: {
        type: String,
        value: '\xA0',
        observer: '_formatMessage'
      },
      icon: {
        type: String,
        value: 'casper-icons:error-outline'
      }
    };
  }

  _formatMessage (message) {
    if (!message) return;

    this.$.errorMessage.textContent = this.message.replace(/\\n/mg, '');
  }

  setCustom (customHtml) {
    this.$.errorPanel.classList.add('hide');
    this.$.customHtml.innerHTML = customHtml;
    this.$.customHtml.classList.remove('hide');
  }

  clearCustom () {
    this.$.customHtml.classList.add('hide');
    this.$.errorPanel.classList.remove('hide');
  }
}

window.customElements.define(CasperWizardStatusPage.is, CasperWizardStatusPage);