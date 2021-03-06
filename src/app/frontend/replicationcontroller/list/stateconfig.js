// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {stateName as chromeStateName} from 'chrome/state';
import {breadcrumbsConfig} from 'common/components/breadcrumbs/service';
import {stateName as workloadsStateName} from 'workloads/state';

import {stateUrl} from './../state';
import {ReplicationControllerListController} from './controller';

/**
 * I18n object that defines strings for translation used in this file.
 */
const i18n = {
  /** @type {string} @desc Label 'Replication Controllers' that appears as a breadcrumbs on the
   action bar. */
  MSG_BREADCRUMBS_RC_LABEL: goog.getMsg('Replication Controllers'),
};

/**
 * Config state object for the Replication Controller list view.
 *
 * @type {!ui.router.StateConfig}
 */
export const config = {
  url: stateUrl,
  parent: chromeStateName,
  resolve: {
    'replicationControllerList': resolveReplicationControllerList,
  },
  data: {
    [breadcrumbsConfig]: {
      'label': i18n.MSG_BREADCRUMBS_RC_LABEL,
      'parent': workloadsStateName,
    },
  },
  views: {
    '': {
      controller: ReplicationControllerListController,
      controllerAs: '$ctrl',
      templateUrl: 'replicationcontroller/list/list.html',
    },
  },
};

/**
 * @param {!angular.$resource} $resource
 * @return {!angular.Resource}
 * @ngInject
 */
export function replicationControllerListResource($resource) {
  return $resource('api/v1/replicationcontroller/:namespace');
}

/**
 * @param {!angular.Resource} kdRCListResource
 * @param {!./../../chrome/state.StateParams} $stateParams
 * @param {!./../../common/dataselect/service.DataSelectService} kdDataSelectService
 * @return {!angular.$q.Promise}
 * @ngInject
 */
export function resolveReplicationControllerList(
    kdRCListResource, $stateParams, kdDataSelectService) {
  let query = kdDataSelectService.getDefaultResourceQuery($stateParams.namespace);
  return kdRCListResource.get(query).$promise;
}
