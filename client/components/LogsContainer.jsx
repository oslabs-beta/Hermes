/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Logs from "./Logs";
import useAxios from "../hooks/useAxios";
const LogsContainer = () => {
  // const logs = useAxios()

  // the below data is the result of a GET request to http://localhost:9200/logstash-*/_search

  const obj = {
    "took": 718,
    "timed_out": false,
    "_shards": {
      "total": 4,
      "successful": 4,
      "skipped": 0,
      "failed": 0
    },
    "hits": {
      "total": {
        "value": 10000,
        "relation": "gte"
      },
      "max_score": 1.0,
      "hits": [
        {
          "_index": "logstash-2021.09.01",
          "_type": "flb_type",
          "_id": "3Wkqo3sBmW35XNKvdmtv",
          "_score": 1.0,
          "_source": {
            "@timestamp": "2021-09-01T19:32:20.932Z",
            "log": "W0901 19:32:20.932033       1 client_config.go:608] Neither --kubeconfig nor --master was specified.  Using the inClusterConfig.  This might not work.\n",
            "stream": "stderr",
            "time": "2021-09-01T19:32:20.932498648Z",
            "kubernetes": {
              "pod_name": "ingress-nginx-admission-patch-8tkbl",
              "namespace_name": "ingress-nginx",
              "pod_id": "364fd3ee-4669-4e07-b2e8-72ee4c2b8dc1",
              "labels": {
                "addonmanager_kubernetes_io/mode": "Reconcile",
                "app_kubernetes_io/component": "admission-webhook",
                "app_kubernetes_io/instance": "ingress-nginx",
                "app_kubernetes_io/name": "ingress-nginx",
                "controller-uid": "54772320-61fe-4602-93ef-4a79293b4784",
                "job-name": "ingress-nginx-admission-patch"
              },
              "host": "minikube",
              "container_name": "patch",
              "docker_id": "a99bcf569f3a8fbf09e747dcb9f5916aae5a1309ac8188e56f9c28bc160d8586",
              "container_hash": "jettech/kube-webhook-certgen@sha256:950833e19ade18cd389d647efb88992a7cc077abedef343fa59e012d376d79b7"
            }
          }
        },
        {
          "_index": "logstash-2021.09.01",
          "_type": "flb_type",
          "_id": "8mkqo3sBmW35XNKvdmtv",
          "_score": 1.0,
          "_source": {
            "@timestamp": "2021-09-01T19:31:44.557Z",
            "log": "I0901 19:31:44.557434       1 node.go:172] Successfully retrieved node IP: 192.168.64.4\n",
            "stream": "stderr",
            "time": "2021-09-01T19:31:44.557812647Z",
            "kubernetes": {
              "pod_name": "kube-proxy-q8wnz",
              "namespace_name": "kube-system",
              "pod_id": "a38dc4d8-1d25-4f3c-8402-f24bb5321729",
              "labels": {
                "controller-revision-hash": "6896ccdc5",
                "k8s-app": "kube-proxy",
                "pod-template-generation": "1"
              },
              "host": "minikube",
              "container_name": "kube-proxy",
              "docker_id": "db36158b66323772de8dfebb25c0d12e41aaded727e15ae13f23ce060f16f9f8",
              "container_hash": "k8s.gcr.io/kube-proxy@sha256:3ee783402715225d6bc483b3a2f8ea11adcb997d00fb5ca2f74734023ade0561"
            }
          }
        },
        {
          "_index": "logstash-2021.09.01",
          "_type": "flb_type",
          "_id": "9mkqo3sBmW35XNKvdmtv",
          "_score": 1.0,
          "_source": {
            "@timestamp": "2021-09-01T19:31:44.557Z",
            "log": "I0901 19:31:44.557641       1 server_others.go:140] Detected node IP 192.168.64.4\n",
            "stream": "stderr",
            "time": "2021-09-01T19:31:44.557879616Z",
            "kubernetes": {
              "pod_name": "kube-proxy-q8wnz",
              "namespace_name": "kube-system",
              "pod_id": "a38dc4d8-1d25-4f3c-8402-f24bb5321729",
              "labels": {
                "controller-revision-hash": "6896ccdc5",
                "k8s-app": "kube-proxy",
                "pod-template-generation": "1"
              },
              "host": "minikube",
              "container_name": "kube-proxy",
              "docker_id": "db36158b66323772de8dfebb25c0d12e41aaded727e15ae13f23ce060f16f9f8",
              "container_hash": "k8s.gcr.io/kube-proxy@sha256:3ee783402715225d6bc483b3a2f8ea11adcb997d00fb5ca2f74734023ade0561"
            }
          }
        },
        {
          "_index": "logstash-2021.09.01",
          "_type": "flb_type",
          "_id": "-Gkqo3sBmW35XNKvdmtv",
          "_score": 1.0,
          "_source": {
            "@timestamp": "2021-09-01T19:31:44.558Z",
            "log": "W0901 19:31:44.557795       1 server_others.go:598] Unknown proxy mode \"\", assuming iptables proxy\n",
            "stream": "stderr",
            "time": "2021-09-01T19:31:44.558058357Z",
            "kubernetes": {
              "pod_name": "kube-proxy-q8wnz",
              "namespace_name": "kube-system",
              "pod_id": "a38dc4d8-1d25-4f3c-8402-f24bb5321729",
              "labels": {
                "controller-revision-hash": "6896ccdc5",
                "k8s-app": "kube-proxy",
                "pod-template-generation": "1"
              },
              "host": "minikube",
              "container_name": "kube-proxy",
              "docker_id": "db36158b66323772de8dfebb25c0d12e41aaded727e15ae13f23ce060f16f9f8",
              "container_hash": "k8s.gcr.io/kube-proxy@sha256:3ee783402715225d6bc483b3a2f8ea11adcb997d00fb5ca2f74734023ade0561"
            }
          }
        },
        {
          "_index": "logstash-2021.09.01",
          "_type": "flb_type",
          "_id": "-mkqo3sBmW35XNKvdmtv",
          "_score": 1.0,
          "_source": {
            "@timestamp": "2021-09-01T19:31:44.631Z",
            "log": "W0901 19:31:44.631507       1 server_others.go:197] No iptables support for IPv6: exit status 3\n",
            "stream": "stderr",
            "time": "2021-09-01T19:31:44.631966211Z",
            "kubernetes": {
              "pod_name": "kube-proxy-q8wnz",
              "namespace_name": "kube-system",
              "pod_id": "a38dc4d8-1d25-4f3c-8402-f24bb5321729",
              "labels": {
                "controller-revision-hash": "6896ccdc5",
                "k8s-app": "kube-proxy",
                "pod-template-generation": "1"
              },
              "host": "minikube",
              "container_name": "kube-proxy",
              "docker_id": "db36158b66323772de8dfebb25c0d12e41aaded727e15ae13f23ce060f16f9f8",
              "container_hash": "k8s.gcr.io/kube-proxy@sha256:3ee783402715225d6bc483b3a2f8ea11adcb997d00fb5ca2f74734023ade0561"
            }
          }
        },
        {
          "_index": "logstash-2021.09.01",
          "_type": "flb_type",
          "_id": "_Gkqo3sBmW35XNKvdmtv",
          "_score": 1.0,
          "_source": {
            "@timestamp": "2021-09-01T19:31:44.632Z",
            "log": "I0901 19:31:44.631550       1 server_others.go:208] kube-proxy running in single-stack IPv4 mode\n",
            "stream": "stderr",
            "time": "2021-09-01T19:31:44.632037262Z",
            "kubernetes": {
              "pod_name": "kube-proxy-q8wnz",
              "namespace_name": "kube-system",
              "pod_id": "a38dc4d8-1d25-4f3c-8402-f24bb5321729",
              "labels": {
                "controller-revision-hash": "6896ccdc5",
                "k8s-app": "kube-proxy",
                "pod-template-generation": "1"
              },
              "host": "minikube",
              "container_name": "kube-proxy",
              "docker_id": "db36158b66323772de8dfebb25c0d12e41aaded727e15ae13f23ce060f16f9f8",
              "container_hash": "k8s.gcr.io/kube-proxy@sha256:3ee783402715225d6bc483b3a2f8ea11adcb997d00fb5ca2f74734023ade0561"
            }
          }
        },
        {
          "_index": "logstash-2021.09.01",
          "_type": "flb_type",
          "_id": "_mkqo3sBmW35XNKvdmtv",
          "_score": 1.0,
          "_source": {
            "@timestamp": "2021-09-01T19:31:44.632Z",
            "log": "I0901 19:31:44.631566       1 server_others.go:212] Using iptables Proxier.\n",
            "stream": "stderr",
            "time": "2021-09-01T19:31:44.632042381Z",
            "kubernetes": {
              "pod_name": "kube-proxy-q8wnz",
              "namespace_name": "kube-system",
              "pod_id": "a38dc4d8-1d25-4f3c-8402-f24bb5321729",
              "labels": {
                "controller-revision-hash": "6896ccdc5",
                "k8s-app": "kube-proxy",
                "pod-template-generation": "1"
              },
              "host": "minikube",
              "container_name": "kube-proxy",
              "docker_id": "db36158b66323772de8dfebb25c0d12e41aaded727e15ae13f23ce060f16f9f8",
              "container_hash": "k8s.gcr.io/kube-proxy@sha256:3ee783402715225d6bc483b3a2f8ea11adcb997d00fb5ca2f74734023ade0561"
            }
          }
        },
        {
          "_index": "logstash-2021.09.01",
          "_type": "flb_type",
          "_id": "AGkqo3sBmW35XNKvdmxw",
          "_score": 1.0,
          "_source": {
            "@timestamp": "2021-09-01T19:31:44.632Z",
            "log": "I0901 19:31:44.631799       1 server.go:643] Version: v1.21.2\n",
            "stream": "stderr",
            "time": "2021-09-01T19:31:44.632045102Z",
            "kubernetes": {
              "pod_name": "kube-proxy-q8wnz",
              "namespace_name": "kube-system",
              "pod_id": "a38dc4d8-1d25-4f3c-8402-f24bb5321729",
              "labels": {
                "controller-revision-hash": "6896ccdc5",
                "k8s-app": "kube-proxy",
                "pod-template-generation": "1"
              },
              "host": "minikube",
              "container_name": "kube-proxy",
              "docker_id": "db36158b66323772de8dfebb25c0d12e41aaded727e15ae13f23ce060f16f9f8",
              "container_hash": "k8s.gcr.io/kube-proxy@sha256:3ee783402715225d6bc483b3a2f8ea11adcb997d00fb5ca2f74734023ade0561"
            }
          }
        },
        {
          "_index": "logstash-2021.09.01",
          "_type": "flb_type",
          "_id": "Amkqo3sBmW35XNKvdmxw",
          "_score": 1.0,
          "_source": {
            "@timestamp": "2021-09-01T19:31:44.638Z",
            "log": "I0901 19:31:44.632092       1 conntrack.go:100] Set sysctl 'net/netfilter/nf_conntrack_tcp_timeout_established' to 86400\n",
            "stream": "stderr",
            "time": "2021-09-01T19:31:44.638797699Z",
            "kubernetes": {
              "pod_name": "kube-proxy-q8wnz",
              "namespace_name": "kube-system",
              "pod_id": "a38dc4d8-1d25-4f3c-8402-f24bb5321729",
              "labels": {
                "controller-revision-hash": "6896ccdc5",
                "k8s-app": "kube-proxy",
                "pod-template-generation": "1"
              },
              "host": "minikube",
              "container_name": "kube-proxy",
              "docker_id": "db36158b66323772de8dfebb25c0d12e41aaded727e15ae13f23ce060f16f9f8",
              "container_hash": "k8s.gcr.io/kube-proxy@sha256:3ee783402715225d6bc483b3a2f8ea11adcb997d00fb5ca2f74734023ade0561"
            }
          }
        },
        {
          "_index": "logstash-2021.09.01",
          "_type": "flb_type",
          "_id": "BWkqo3sBmW35XNKvdmxw",
          "_score": 1.0,
          "_source": {
            "@timestamp": "2021-09-01T19:31:44.638Z",
            "log": "I0901 19:31:44.632122       1 conntrack.go:100] Set sysctl 'net/netfilter/nf_conntrack_tcp_timeout_close_wait' to 3600\n",
            "stream": "stderr",
            "time": "2021-09-01T19:31:44.638845132Z",
            "kubernetes": {
              "pod_name": "kube-proxy-q8wnz",
              "namespace_name": "kube-system",
              "pod_id": "a38dc4d8-1d25-4f3c-8402-f24bb5321729",
              "labels": {
                "controller-revision-hash": "6896ccdc5",
                "k8s-app": "kube-proxy",
                "pod-template-generation": "1"
              },
              "host": "minikube",
              "container_name": "kube-proxy",
              "docker_id": "db36158b66323772de8dfebb25c0d12e41aaded727e15ae13f23ce060f16f9f8",
              "container_hash": "k8s.gcr.io/kube-proxy@sha256:3ee783402715225d6bc483b3a2f8ea11adcb997d00fb5ca2f74734023ade0561"
            }
          }
        }
      ]
    }
  };
  const arr = obj.hits.hits;
  return (
    <>
      <div className="filter-box">
        <button type="button">add filter</button>
        <select name="cars" id="cars">
          <option value="filters">filters</option>
          
        </select>
      </div>
      <div className='logs'>
        <header className="logs-display-header">


        </header>

        <div className="logs-fields">
          {arr.map(logs => {
            return < Logs key={logs._id} time={logs['source'['@timestamp']]} index={logs._index}  />;
          })}
        hey
        </div>

      </div>
    </>
  );
};

export default LogsContainer;