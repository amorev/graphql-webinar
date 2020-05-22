<?php
require_once __DIR__.'/vendor/autoload.php';

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\GraphQL;

$schema = new Schema(
    [
        'query' => new ObjectType(
            [
                'name' => 'Query',
                'fields' => [
                    'hello' => [
                        'type' => Type::string(),
                        'args' => [
                            'name' => Type::string(),
                        ],
                        'resolve' => function ($rootValue, $args) {
                            return "Hello, ".$args['name'];
                        },
                    ],
                ],
            ]
        ),
    ]
);

$query = 'query { hello(name: "Anton") }';

echo json_encode(GraphQL::executeQuery($schema, $query)->toArray());
