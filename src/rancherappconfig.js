const appconfig = [
  {
    'Container Images': [
      {
        default: 'true',
        description: 'Use default Docker image',
        group: 'Container Images',
        label: 'Use Default Image',
        max: 0,
        maxLength: 0,
        min: 0,
        minLength: 0,
        required: false,
        showSubquestionIf: 'false',
        subquestions: [
          {
            default: 'bitnami/wordpress',
            description: 'WordPress image name',
            label: 'WordPress Image Name',
            max: 0,
            maxLength: 0,
            min: 0,
            minLength: 0,
            required: false,
            type: 'string',
            variable: 'image.repository'
          },
          {
            default: '4.9.4',
            description: 'WordPress image tag',
            label: 'Image Tag',
            max: 0,
            maxLength: 0,
            min: 0,
            minLength: 0,
            required: false,
            type: 'string',
            variable: 'image.tag'
          },
          {
            default: 'bitnami/mariadb',
            description: 'MariaDB image name',
            label: 'MariaDB Image Name',
            max: 0,
            maxLength: 0,
            min: 0,
            minLength: 0,
            required: false,
            type: 'string',
            variable: 'mariadb.image.repository'
          },
          {
            default: '10.1.32',
            description: 'MariaDB image tag',
            label: 'MariaDB Image Tag',
            max: 0,
            maxLength: 0,
            min: 0,
            minLength: 0,
            required: false,
            type: 'string',
            variable: 'mariadb.image.tag'
          }
        ],
        type: 'boolean',
        variable: 'defaultImage'
      }
    ]
  },
  {
    'WordPress Settings': [
      {
        default: 'user',
        description: 'User of the application',
        group: 'WordPress Settings',
        label: 'WordPress Usernname',
        max: 0,
        maxLength: 0,
        min: 0,
        minLength: 0,
        required: true,
        type: 'string',
        variable: 'wordpressUsername'
      },
      {
        description: 'password will be auto-generated if not specified',
        group: 'WordPress Settings',
        label: 'WordPress Password',
        max: 0,
        maxLength: 0,
        min: 0,
        minLength: 0,
        required: false,
        type: 'password',
        variable: 'wordpressPassword'
      },
      {
        default: 'user@example.com',
        description: 'Admin email',
        group: 'WordPress Settings',
        label: 'WordPress Admin Email',
        max: 0,
        maxLength: 0,
        min: 0,
        minLength: 0,
        required: true,
        type: 'string',
        variable: 'wordpressEmail'
      },
      {
        default: 'false',
        description: 'Enable persistent volume for WordPress',
        group: 'WordPress Settings',
        label: 'WordPress Persistent Volume Enabled',
        max: 0,
        maxLength: 0,
        min: 0,
        minLength: 0,
        required: true,
        showSubquestionIf: 'true',
        subquestions: [
          {
            default: '10Gi',
            description: 'WordPress Persistent Volume Size',
            label: 'WordPress Volume Size',
            max: 0,
            maxLength: 0,
            min: 0,
            minLength: 0,
            required: false,
            type: 'string',
            variable: 'persistence.size'
          },
          {
            description:
              'If undefined or null, uses the default StorageClass. Default to null',
            label: 'Default StorageClass for WordPress',
            max: 0,
            maxLength: 0,
            min: 0,
            minLength: 0,
            required: false,
            type: 'storageclass',
            variable: 'persistence.storageClass'
          },
          {
            description:
              'If not empty, uses the specified existing PVC instead of creating new one',
            label: 'Existing Persistent Volume Claim for WordPress',
            max: 0,
            maxLength: 0,
            min: 0,
            minLength: 0,
            required: false,
            type: 'string',
            variable: 'persistence.existingClaim'
          }
        ],
        type: 'boolean',
        variable: 'persistence.enabled'
      }
    ]
  },
  {
    'Database Settings': [
      {
        default: 'true',
        description:
          'Deploy a database server as part of this deployment, or set to false and configure an external database connection.',
        group: 'Database Settings',
        label: 'Install MariaDB',
        max: 0,
        maxLength: 0,
        min: 0,
        minLength: 0,
        required: true,
        showSubquestionIf: 'true',
        subquestions: [
          {
            default: 'wordpress',
            description: 'Database name to create',
            label: 'MariaDB Database',
            max: 0,
            maxLength: 0,
            min: 0,
            minLength: 0,
            required: false,
            type: 'string',
            variable: 'mariadb.mariadbDatabase'
          },
          {
            default: 'wordpress',
            description: 'Database user to create',
            label: 'MariaDB User',
            max: 0,
            maxLength: 0,
            min: 0,
            minLength: 0,
            required: false,
            type: 'string',
            variable: 'mariadb.mariadbUser'
          },
          {
            description: 'password will be auto-generated if not specified',
            label: 'MariaDB Password',
            max: 0,
            maxLength: 0,
            min: 0,
            minLength: 0,
            required: false,
            type: 'password',
            variable: 'mariadb.mariadbPassword'
          },
          {
            default: 'false',
            description: 'Enable persistent volume for MariaDB',
            group: 'Database Settings',
            label: 'MariaDB Persistent Volume Enabled',
            max: 0,
            maxLength: 0,
            min: 0,
            minLength: 0,
            required: true,
            showIf: 'mariadb.enabled=true',
            showSubquestionIf: 'true',
            subquestions: [
              {
                default: '8Gi',
                description: 'MariaDB Persistent Volume Size',
                label: 'MariaDB Volume Size',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'string',
                variable: 'mariadb.persistence.size'
              },
              {
                description:
                  'If undefined or null, uses the default StorageClass. Default to null',
                label: 'Default StorageClass for MariaDB',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'storageclass',
                variable: 'mariadb.persistence.storageClass'
              },
              {
                description:
                  'If not empty, uses the specified existing PVC instead of creating new one',
                label: 'Existing Persistent Volume Claim for MariaDB',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'string',
                variable: 'mariadb.persistence.existingClaim'
              }
            ],
            type: 'boolean',
            variable: 'mariadb.persistence.enabled'
          },
          {
            default: 'false',
            description: 'Enable persistent volume for MariaDB',
            group: 'Database Settings',
            label: 'MariaDB Persistent Volume Enabled',
            max: 0,
            maxLength: 0,
            min: 0,
            minLength: 0,
            required: true,
            showIf: 'mariadb.enabled=true',
            showSubquestionIf: 'true',
            subquestions: [
              {
                default: '8Gi',
                description: 'MariaDB Persistent Volume Size',
                label: 'MariaDB Volume Size',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'string',
                variable: 'mariadb.persistence.size'
              },
              {
                description:
                  'If undefined or null, uses the default StorageClass. Default to null',
                label: 'Default StorageClass for MariaDB',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'storageclass',
                variable: 'mariadb.persistence.storageClass'
              },
              {
                description:
                  'If not empty, uses the specified existing PVC instead of creating new one',
                label: 'Existing Persistent Volume Claim for MariaDB',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'string',
                variable: 'mariadb.persistence.existingClaim'
              }
            ],
            type: 'boolean',
            variable: 'mariadb.persistence.enabled'
          },
          {
            default: 'false',
            description: 'Enable persistent volume for MariaDB',
            group: 'Database Settings',
            label: 'MariaDB Persistent Volume Enabled',
            max: 0,
            maxLength: 0,
            min: 0,
            minLength: 0,
            required: true,
            showIf: 'mariadb.enabled=true',
            showSubquestionIf: 'true',
            subquestions: [
              {
                default: '8Gi',
                description: 'MariaDB Persistent Volume Size',
                label: 'MariaDB Volume Size',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'string',
                variable: 'mariadb.persistence.size'
              },
              {
                description:
                  'If undefined or null, uses the default StorageClass. Default to null',
                label: 'Default StorageClass for MariaDB',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'storageclass',
                variable: 'mariadb.persistence.storageClass'
              },
              {
                description:
                  'If not empty, uses the specified existing PVC instead of creating new one',
                label: 'Existing Persistent Volume Claim for MariaDB',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'string',
                variable: 'mariadb.persistence.existingClaim'
              }
            ],
            type: 'boolean',
            variable: 'mariadb.persistence.enabled'
          },
          {
            default: 'false',
            description: 'Enable persistent volume for MariaDB',
            group: 'Database Settings',
            label: 'MariaDB Persistent Volume Enabled',
            max: 0,
            maxLength: 0,
            min: 0,
            minLength: 0,
            required: true,
            showIf: 'mariadb.enabled=true',
            showSubquestionIf: 'true',
            subquestions: [
              {
                default: '8Gi',
                description: 'MariaDB Persistent Volume Size',
                label: 'MariaDB Volume Size',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'string',
                variable: 'mariadb.persistence.size'
              },
              {
                description:
                  'If undefined or null, uses the default StorageClass. Default to null',
                label: 'Default StorageClass for MariaDB',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'storageclass',
                variable: 'mariadb.persistence.storageClass'
              },
              {
                description:
                  'If not empty, uses the specified existing PVC instead of creating new one',
                label: 'Existing Persistent Volume Claim for MariaDB',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'string',
                variable: 'mariadb.persistence.existingClaim'
              }
            ],
            type: 'boolean',
            variable: 'mariadb.persistence.enabled'
          },
          {
            default: 'false',
            description: 'Enable persistent volume for MariaDB',
            group: 'Database Settings',
            label: 'MariaDB Persistent Volume Enabled',
            max: 0,
            maxLength: 0,
            min: 0,
            minLength: 0,
            required: true,
            showIf: 'mariadb.enabled=true',
            showSubquestionIf: 'true',
            subquestions: [
              {
                default: '8Gi',
                description: 'MariaDB Persistent Volume Size',
                label: 'MariaDB Volume Size',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'string',
                variable: 'mariadb.persistence.size'
              },
              {
                description:
                  'If undefined or null, uses the default StorageClass. Default to null',
                label: 'Default StorageClass for MariaDB',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'storageclass',
                variable: 'mariadb.persistence.storageClass'
              },
              {
                description:
                  'If not empty, uses the specified existing PVC instead of creating new one',
                label: 'Existing Persistent Volume Claim for MariaDB',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'string',
                variable: 'mariadb.persistence.existingClaim'
              }
            ],
            type: 'boolean',
            variable: 'mariadb.persistence.enabled'
          },
          {
            default: 'false',
            description: 'Enable persistent volume for MariaDB',
            group: 'Database Settings',
            label: 'MariaDB Persistent Volume Enabled',
            max: 0,
            maxLength: 0,
            min: 0,
            minLength: 0,
            required: true,
            showIf: 'mariadb.enabled=true',
            showSubquestionIf: 'true',
            subquestions: [
              {
                default: '8Gi',
                description: 'MariaDB Persistent Volume Size',
                label: 'MariaDB Volume Size',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'string',
                variable: 'mariadb.persistence.size'
              },
              {
                description:
                  'If undefined or null, uses the default StorageClass. Default to null',
                label: 'Default StorageClass for MariaDB',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'storageclass',
                variable: 'mariadb.persistence.storageClass'
              },
              {
                description:
                  'If not empty, uses the specified existing PVC instead of creating new one',
                label: 'Existing Persistent Volume Claim for MariaDB',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'string',
                variable: 'mariadb.persistence.existingClaim'
              }
            ],
            type: 'boolean',
            variable: 'mariadb.persistence.enabled'
          },
          {
            default: 'false',
            description: 'Enable persistent volume for MariaDB',
            group: 'Database Settings',
            label: 'MariaDB Persistent Volume Enabled',
            max: 0,
            maxLength: 0,
            min: 0,
            minLength: 0,
            required: true,
            showIf: 'mariadb.enabled=true',
            showSubquestionIf: 'true',
            subquestions: [
              {
                default: '8Gi',
                description: 'MariaDB Persistent Volume Size',
                label: 'MariaDB Volume Size',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'string',
                variable: 'mariadb.persistence.size'
              },
              {
                description:
                  'If undefined or null, uses the default StorageClass. Default to null',
                label: 'Default StorageClass for MariaDB',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'storageclass',
                variable: 'mariadb.persistence.storageClass'
              },
              {
                description:
                  'If not empty, uses the specified existing PVC instead of creating new one',
                label: 'Existing Persistent Volume Claim for MariaDB',
                max: 0,
                maxLength: 0,
                min: 0,
                minLength: 0,
                required: false,
                type: 'string',
                variable: 'mariadb.persistence.existingClaim'
              }
            ],
            type: 'boolean',
            variable: 'mariadb.persistence.enabled'
          }
        ],
        type: 'boolean',
        variable: 'mariadb.enabled'
      },
      {
        description: 'Host of the external database',
        group: 'Database Settings',
        label: 'External Database Host',
        max: 0,
        maxLength: 0,
        min: 0,
        minLength: 0,
        required: false,
        showIf: 'mariadb.enabled=false',
        type: 'string',
        variable: 'externalDatabase.host'
      },
      {
        description: 'Existing username in the external DB',
        group: 'Database Settings',
        label: 'External Database username',
        max: 0,
        maxLength: 0,
        min: 0,
        minLength: 0,
        required: false,
        showIf: 'mariadb.enabled=false',
        type: 'string',
        variable: 'externalDatabase.user'
      },
      {
        description: 'External database password',
        group: 'Database Settings',
        label: 'External Database password',
        max: 0,
        maxLength: 0,
        min: 0,
        minLength: 0,
        required: false,
        showIf: 'mariadb.enabled=false',
        type: 'password',
        variable: 'externalDatabase.password'
      },
      {
        description: 'Name of the existing database',
        group: 'Database Settings',
        label: 'External Database',
        max: 0,
        maxLength: 0,
        min: 0,
        minLength: 0,
        required: false,
        showIf: 'mariadb.enabled=false',
        type: 'string',
        variable: 'externalDatabase.database'
      },
      {
        default: '3306',
        description: 'External database port number',
        group: 'Database Settings',
        label: 'External Database Port',
        max: 0,
        maxLength: 0,
        min: 0,
        minLength: 0,
        required: false,
        showIf: 'mariadb.enabled=false',
        type: 'string',
        variable: 'externalDatabase.port'
      }
    ]
  },
  {
    'Services and Load Balancing': [
      {
        default: 'NodePort',
        description: 'WordPress Service type',
        group: 'Services and Load Balancing',
        label: 'WordPress Service Type',
        max: 0,
        maxLength: 0,
        min: 0,
        minLength: 0,
        options: ['ClusterIP', 'NodePort', 'LoadBalancer'],
        required: true,
        showIf: 'ingress.enabled=false',
        showSubquestionIf: 'NodePort',
        subquestions: [
          {
            description:
              'NodePort http port(to set explicitly, choose port between 30000-32767)',
            label: 'NodePort Http Port',
            max: 32767,
            maxLength: 0,
            min: 30000,
            minLength: 0,
            required: false,
            showIf: 'ingress.enabled=false&&serviceType=NodePort',
            type: 'int',
            variable: 'nodePorts.http'
          },
          {
            description:
              'NodePort https port(to set explicitly, choose port between 30000-32767)',
            label: 'NodePort Https Port',
            max: 32767,
            maxLength: 0,
            min: 30000,
            minLength: 0,
            required: false,
            showIf: 'ingress.enabled=false&&serviceType=NodePort',
            type: 'int',
            variable: 'nodePorts.https'
          }
        ],
        type: 'enum',
        variable: 'serviceType'
      },
      {
        default: 'true',
        description: 'Expose app using Layer 7 Load Balancer - ingress',
        group: 'Services and Load Balancing',
        label: 'Expose app using Layer 7 Load Balancer',
        max: 0,
        maxLength: 0,
        min: 0,
        minLength: 0,
        required: false,
        showSubquestionIf: 'true',
        subquestions: [
          {
            default: 'xip.io',
            description: 'Hostname to your WordPress installation',
            label: 'Hostname',
            max: 0,
            maxLength: 0,
            min: 0,
            minLength: 0,
            required: true,
            type: 'hostname',
            variable: 'ingress.hosts[0].name'
          }
        ],
        type: 'boolean',
        variable: 'ingress.enabled'
      }
    ]
  }
]

export default appconfig
