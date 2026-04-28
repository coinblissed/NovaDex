#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env, String};

#[test]
fn test_initialize_and_mint() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let minter = Address::generate(&env);
    let user = Address::generate(&env);

    let contract_id = env.register_contract(None, TokenContract);
    let client = TokenContractClient::new(&env, &contract_id);

    let name = String::from_str(&env, "Nova Token");
    let symbol = String::from_str(&env, "NOVA");
    let decimals = 7;

    client.initialize(&admin, &minter, &name, &symbol, &decimals);

    assert_eq!(client.name(), name);
    assert_eq!(client.symbol(), symbol);
    assert_eq!(client.decimals(), decimals);
    assert_eq!(client.total_supply(), 0);

    let amount = 1000;
    client.mint(&minter, &user, &amount);

    assert_eq!(client.balance(&user), amount);
    assert_eq!(client.total_supply(), amount);
}

#[test]
fn test_transfer() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let minter = Address::generate(&env);
    let user1 = Address::generate(&env);
    let user2 = Address::generate(&env);

    let contract_id = env.register_contract(None, TokenContract);
    let client = TokenContractClient::new(&env, &contract_id);

    client.initialize(
        &admin,
        &minter,
        &String::from_str(&env, "Nova Token"),
        &String::from_str(&env, "NOVA"),
        &7,
    );

    client.mint(&minter, &user1, &1000);
    client.transfer(&user1, &user2, &400);

    assert_eq!(client.balance(&user1), 600);
    assert_eq!(client.balance(&user2), 400);
}

#[test]
fn test_allowance_and_transfer_from() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let minter = Address::generate(&env);
    let owner = Address::generate(&env);
    let spender = Address::generate(&env);
    let receiver = Address::generate(&env);

    let contract_id = env.register_contract(None, TokenContract);
    let client = TokenContractClient::new(&env, &contract_id);

    client.initialize(
        &admin,
        &minter,
        &String::from_str(&env, "Nova Token"),
        &String::from_str(&env, "NOVA"),
        &7,
    );

    client.mint(&minter, &owner, &1000);
    client.approve(&owner, &spender, &500, &200);

    assert_eq!(client.allowance(&owner, &spender), 500);

    client.transfer_from(&spender, &owner, &receiver, &300);

    assert_eq!(client.balance(&owner), 700);
    assert_eq!(client.balance(&receiver), 300);
    assert_eq!(client.allowance(&owner, &spender), 200);
}

#[test]
#[should_panic(expected = "not authorized to mint")]
fn test_unauthorized_mint() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let minter = Address::generate(&env);
    let non_minter = Address::generate(&env);
    let user = Address::generate(&env);

    let contract_id = env.register_contract(None, TokenContract);
    let client = TokenContractClient::new(&env, &contract_id);

    client.initialize(
        &admin,
        &minter,
        &String::from_str(&env, "Nova Token"),
        &String::from_str(&env, "NOVA"),
        &7,
    );

    client.mint(&non_minter, &user, &1000);
}
