#!/usr/bin/env node
import { fileURLToPath } from "url";
import { dirname } from "path";

const moduleURL = import.meta.url;
const __filename = fileURLToPath(moduleURL);
const __dirname = dirname(__filename);

import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";
import clear from "clear";
import open from "open";
import fs from "fs";
import path from "path";
import ora from "ora";
import cliSpinners from "cli-spinners";
import request from "request";

clear();

//! Importing User Data from data.json
const dataFile = path.resolve(__dirname, "data.json");
const res = fs.readFileSync(dataFile);

const user_data = JSON.parse(res);
const {
  user_name,
  user_email,
  whatsapp_number,
  twitter_username,
  linkedin_username,
  github_username,
  npx_card_handle,
  job_title,
  leetcode_username,
  instagram_username,
  portfolio_username,
} = user_data;

const defaultWhatsAppMessage =
  "Hello there! Thank you for reaching out via WhatsApp. I'm excited to connect with you. How can I assist you today? Feel free to ask any questions or share your thoughts, and I'll be happy to help. Have a great day!";

const prompt = inquirer.createPromptModule();

const questions = [
  {
    type: "list",
    name: "action",
    message: `Hi there! I'm ${user_name}. What would you like to do?`,
    choices: [
      {
        name: `Send me an ${chalk.green.bold("email")}`,
        value: () => {
          open(`mailto:${user_email}`);
          console.log("\nDone, see you soon in your inbox.\n");
        },
      },
      {
        name: `Message me on ${chalk.green.bold("WhatsApp")}`,
        value: () => {
          open(
            `https://wa.me/${whatsapp_number}?text=${encodeURIComponent(
              defaultWhatsAppMessage
            )}`
          );
          console.log("\nWhatsApp chat opened!\n");
        },
      },
      {
        name: "Just quit.",
        value: () => {
          console.log("Goodbye :)\n");
        },
      },
    ],
  },
];

// The rest of the code remains the same

const data = {
  name: chalk.bold.green(`                  ${user_name}`),
  work: `${chalk.white(job_title)}`,
  twitter: chalk.gray("https://twitter.com/") + chalk.cyan(twitter_username),
  github: chalk.gray("https://github.com/") + chalk.green(github_username),
  linkedin:
    chalk.gray("https://linkedin.com/in/") + chalk.blue(linkedin_username),
  leetcode: chalk.gray("https://leetcode.com/") + chalk.blue(leetcode_username),
  instagram:
    chalk.gray("https://instagram.com/") + chalk.magenta(instagram_username),
  portfolio: chalk.gray("https://") + chalk.magenta(portfolio_username),
  web: chalk.cyan(portfolio_username),
  npx: chalk.red("npx") + " " + chalk.white(npx_card_handle),
  labelWork: chalk.white.bold("      Work:"),
  labelTwitter: chalk.white.bold("    Twitter:"),
  labelGitHub: chalk.white.bold("     GitHub:"),
  labelLinkedIn: chalk.white.bold("  LinkedIn:"),
  labelLeetcode: chalk.white.bold("  LeetCode:"),
  labelInstagram: chalk.white.bold(" Instagram:"),
  labelPortfolio: chalk.white.bold(" Portfolio:"),
  labelWeb: chalk.white.bold("       Web:"),
  labelCard: chalk.white.bold("      Card:"),
};

const boxenOptions = {
  margin: 1,
  float: "center",
  padding: 1,
  borderStyle: "round",
  borderColor: "cyan",
};

const me = boxen(
  [
    `${data.name}`,
    ``,
    `${data.labelWork}  ${data.work}`,
    ``,
    `${data.labelTwitter}  ${data.twitter}`,
    `${data.labelGitHub}  ${data.github}`,
    `${data.labelLinkedIn}  ${data.linkedin}`,
    `${data.labelWeb}  ${data.web}`,
    ``,
    `${data.labelCard}  ${data.npx}`,
    ``,
    `${data.labelLeetcode}  ${data.leetcode}`,
    ``,
    `${data.labelInstagram}  ${data.instagram}`,
    ``,
    `${data.labelPortfolio}  ${data.portfolio}`,
    ``,
    `${chalk.italic("I am currently looking for new opportunities,")}`,
    `${chalk.italic("my inbox is always open. Whether you have a")}`,
    `${chalk.italic("question or just want to say hi, I will try to")}`,
    `${chalk.italic("get back to you as soon as possible!")}`,
  ].join("\n"),
  boxenOptions
);

console.log(me);

prompt(questions).then((answer) => answer.action());
