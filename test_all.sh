#!/bin/bash
# Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.
# This file is made available under version 3 of the GNU General Public License.

set -e
set -o xtrace

# Resolve the location of this script
source="${BASH_SOURCE[0]}"
while [ -h "$source" ] ; do
  prev_source="$source"
  source="$(readlink "$source")";
  if [[ "$source" != /* ]]; then
    # if the link was relative, it was relative to where it came from
    dir="$( cd -P "$( dirname "$prev_source" )" && pwd )"
    source="$dir/$source"
  fi
done
dir="$( cd -P "$( dirname "$source" )" && pwd )"

set -x

# Disabled until GR-18108 is fixed
# ${dir}/weather_predictor/test.sh
${dir}/fastr_javaui/test.sh
${dir}/fastr_node/test.sh
${dir}/fastr_scalar/run.sh
${dir}/r_java_embedding/test.sh
${dir}/r_java_bench/test.sh
${dir}/shared_domain_logic/test.sh
