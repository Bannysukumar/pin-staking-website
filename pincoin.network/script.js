// Set the launch date (change this to your desired launch date)
const launchDate = new Date('2025-05-01T00:00:00').getTime();

// Update the contract address constant at the top of the file
const RECEIVING_ADDRESS = '0x4764AA5B111fa4fA7Cf05997251e9ca4F76805A7';

// Add USDT contract address
const USDT_CONTRACT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955'; // BSC USDT Contract

// Add these constants at the top of your file
const PIN_CONTRACT_ADDRESS = '0x4764AA5B111fa4fA7Cf05997251e9ca4F76805A7';
const MIN_PIN_AMOUNT = 10000;
const PIN_PRICE_USD = 0.001;

// Update CONFIG object with more robust settings
const CONFIG = {
    MIN_PIN_AMOUNT: 10000,
    PIN_PRICE_USD: 0.001,
    BSC_CHAIN_ID: '0x38',
    BSC_RPC_URL: 'https://bsc-dataseed1.binance.org',
    USDT_DECIMALS: 6,
    GAS_LIMIT: {
        BNB: 21000,
        USDT: 100000
    },
    RETRY_ATTEMPTS: 5,
    RETRY_DELAY: 2000,
    RPC_ENDPOINTS: [
        'https://bsc-dataseed1.binance.org',
        'https://bsc-dataseed2.binance.org',
        'https://bsc-dataseed3.binance.org',
        'https://bsc-dataseed4.binance.org'
    ],
    GAS_PRICE_MULTIPLIER: 1.1, // 10% buffer
    GAS_LIMIT_MULTIPLIER: 1.2,  // 20% buffer
    DEFAULT_GAS_PRICE: '5000000000' // 5 Gwei
};

// Update the USDT_ABI with the correct approve function
const USDT_ABI = [
    {
        "inputs": [
            {"name": "spender", "type": "address"},
            {"name": "amount", "type": "uint256"}
        ],
        "name": "approve",
        "outputs": [{"name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"name": "recipient", "type": "address"},
            {"name": "amount", "type": "uint256"}
        ],
        "name": "transfer",
        "outputs": [{"name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"name": "account", "type": "address"}
        ],
        "name": "balanceOf",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"name": "owner", "type": "address"},
            {"name": "spender", "type": "address"}
        ],
        "name": "allowance",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
];

// Update countdown timer with smooth animation
function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Smooth update with animation
    updateElementWithAnimation('days', days);
    updateElementWithAnimation('hours', hours);
    updateElementWithAnimation('minutes', minutes);
    updateElementWithAnimation('seconds', seconds);

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = '<h2>Staking Platform is Live!</h2>';
    }
}

function updateElementWithAnimation(elementId, value) {
    const element = document.getElementById(elementId);
    const currentValue = parseInt(element.textContent);
    const newValue = value;

    if (currentValue !== newValue) {
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.2s ease-in-out';
        
        setTimeout(() => {
            element.textContent = String(newValue).padStart(2, '0');
            element.style.transform = 'scale(1)';
        }, 100);
    }
}

// Update countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);

// Handle newsletter subscription with improved feedback
document.getElementById('subscribe-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    // Add loading state
    const button = this.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Subscribing...';
    button.disabled = true;

    // Simulate API call
    setTimeout(() => {
        button.textContent = 'Subscribed!';
        button.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '#64ffda';
            button.disabled = false;
            this.reset();
        }, 2000);
    }, 1000);
});

// Initialize staking info updates
function updateStakingInfo() {
    // This would normally come from your backend
    const totalStaked = Math.floor(Math.random() * 1000000);
    const stakingInfoBlock = document.querySelector('.info-block:nth-child(2) .highlight');
    stakingInfoBlock.textContent = `${totalStaked.toLocaleString()} PIN`;
}

// Update staking info every 30 seconds
setInterval(updateStakingInfo, 30000);
updateStakingInfo(); // Initial update 

function copyAddress() {
    const addressInput = document.getElementById('contract-address');
    addressInput.select();
    document.execCommand('copy');
    
    // Visual feedback
    const copyBtn = document.querySelector('.copy-btn');
    const originalIcon = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    copyBtn.style.color = '#4CAF50';
    
    setTimeout(() => {
        copyBtn.innerHTML = originalIcon;
        copyBtn.style.color = '#64ffda';
    }, 2000);
}

// Update the swap calculator functionality
document.getElementById('calculatorPinAmount').addEventListener('input', function(e) {
    const pinAmount = parseFloat(e.target.value) || 0;
    const usdtAmount = pinAmount / 1000; // 1000 PIN = 1 USDT
    document.getElementById('calculatorUsdtAmount').value = usdtAmount.toFixed(2);
});

document.getElementById('calculatorUsdtAmount').addEventListener('input', function(e) {
    const usdtAmount = parseFloat(e.target.value) || 0;
    const pinAmount = usdtAmount * 1000; // 1 USDT = 1000 PIN
    document.getElementById('calculatorPinAmount').value = pinAmount.toFixed(0);
});

// Add swap direction functionality
document.getElementById('swapDirection').addEventListener('click', function() {
    const pinInput = document.getElementById('calculatorPinAmount');
    const usdtInput = document.getElementById('calculatorUsdtAmount');
    
    // Get current values
    const pinValue = pinInput.value;
    const usdtValue = usdtInput.value;
    
    // Toggle readonly attribute
    const wasUsdtReadonly = usdtInput.readOnly;
    usdtInput.readOnly = !wasUsdtReadonly;
    pinInput.readOnly = !pinInput.readOnly;
    
    // Add visual feedback
    this.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        this.style.transform = 'rotate(0deg)';
    }, 300);
});

// Initialize swap calculator with default values
document.getElementById('calculatorPinAmount').value = '1000';
document.getElementById('calculatorUsdtAmount').value = '1.00';

// Add cleanup function for wallet events
function cleanupWalletEvents() {
    if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountChange);
        window.ethereum.removeListener('chainChanged', handleNetworkChange);
    }
}

// Update wallet connection to include cleanup
async function connectWallet() {
    try {
        const provider = detectProvider();
        
        if (!provider) {
            showNotification('Please install a Web3 wallet (MetaMask, Trust Wallet, etc.)', 'error');
            return;
        }

        // Show loading state
        const connectBtn = document.getElementById('connectWallet');
        connectBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        connectBtn.disabled = true;

        // Request account access
        let accounts;
        try {
            accounts = await provider.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            if (error.code === 4001) {
                throw new Error('Please connect your wallet');
            } else {
                throw error;
            }
        }

        selectedWallet = accounts[0];
        window.web3 = new Web3(provider);

        // Switch to BSC network
        await switchToBSCNetwork(provider);

        // Update button state
        connectBtn.innerHTML = `
            <i class="fas fa-wallet"></i>
            <span>${selectedWallet.slice(0, 6)}...${selectedWallet.slice(-4)}</span>
        `;
        connectBtn.classList.add('connected');
        connectBtn.disabled = false;

        // Setup event listeners
        provider.on('accountsChanged', handleAccountChange);
        provider.on('chainChanged', handleNetworkChange);

        showNotification('Wallet connected successfully', 'success');

    } catch (error) {
        console.error('Wallet connection error:', error);
        const connectBtn = document.getElementById('connectWallet');
        connectBtn.innerHTML = '<i class="fas fa-wallet"></i><span>Connect Wallet</span>';
        connectBtn.disabled = false;
        showNotification(error.message || 'Failed to connect wallet', 'error');
    }
}

// Update detectProvider function to support more wallets
function detectProvider() {
    if (window.ethereum) {
        // Check for specific wallet providers
        if (window.ethereum.isCoinbaseWallet) {
            return window.ethereum; // Coinbase Wallet
        } else if (window.ethereum.isMetaMask) {
            return window.ethereum; // MetaMask
        } else if (window.ethereum.isTrust) {
            return window.ethereum; // Trust Wallet
        } else {
            return window.ethereum; // Generic Web3 wallet
        }
    } else if (window.BinanceChain) {
        return window.BinanceChain; // Binance Wallet
    }
    return null;
}

// Update BSC network settings
async function switchToBSCNetwork(provider) {
    try {
        await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }] // BSC Mainnet
        });
    } catch (error) {
        if (error.code === 4902 || error.code === -32603) {
            try {
                await provider.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x38',
                        chainName: 'Binance Smart Chain',
                        nativeCurrency: {
                            name: 'BNB',
                            symbol: 'BNB',
                            decimals: 18
                        },
                        rpcUrls: [
                            'https://bsc-dataseed1.binance.org',
                            'https://bsc-dataseed2.binance.org',
                            'https://bsc-dataseed3.binance.org',
                            'https://bsc-dataseed4.binance.org'
                        ],
                        blockExplorerUrls: ['https://bscscan.com']
                    }]
                });
            } catch (addError) {
                throw new Error('Please add Binance Smart Chain to your wallet manually');
            }
        } else {
            throw error;
        }
    }
}

// Handle account changes
function handleAccountChange(accounts) {
    if (accounts.length === 0) {
        // Wallet disconnected
        selectedWallet = null;
        const connectBtn = document.getElementById('connectWallet');
        connectBtn.innerHTML = '<i class="fas fa-wallet"></i><span>Connect Wallet</span>';
        connectBtn.classList.remove('connected');
        showNotification('Wallet Disconnected', 'warning');
    } else {
        // Account changed
        selectedWallet = accounts[0];
        const connectBtn = document.getElementById('connectWallet');
        connectBtn.innerHTML = `
            <i class="fas fa-wallet"></i>
            <span>${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}</span>
        `;
    }
}

// Handle network changes
function handleNetworkChange() {
    window.location.reload();
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${
            type === 'success' ? 'fa-check-circle' : 
            type === 'error' ? 'fa-times-circle' : 
            type === 'info' ? 'fa-info-circle' :
            'fa-exclamation-circle'
        }"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 3000);
    }, 3000);
}

// State
let currentBnbPrice = 0;
let minBnbAmount = 0;
let selectedWallet = null;
let web3 = null;

// DOM Elements
const bnbAmountInput = document.getElementById('bnbAmount');
const pinAmountInput = document.getElementById('pinAmount');
const buyButton = document.getElementById('buyPin');
const connectWalletBtn = document.getElementById('connectWallet');
const maxBtn = document.querySelector('.max-btn');

// Initialize
async function init() {
    await calculateMinBnbRequired();
    setupEventListeners();
    updatePinAmount(MIN_PIN_AMOUNT);
    
    // Refresh BNB price every minute
    setInterval(calculateMinBnbRequired, 60000);
}

// Calculate minimum BNB required based on current BNB price
async function calculateMinBnbRequired() {
    try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
        const data = await response.json();
        currentBnbPrice = parseFloat(data.price);
        
        // Calculate minimum BNB required for 10,000 PIN
        // 10,000 PIN * $0.001 (PIN price) = $10 USD worth of BNB
        const totalUsdRequired = 10; // $10 USD
        minBnbAmount = totalUsdRequired / currentBnbPrice;
        
        // Update the displays
        const minBnbDisplay = document.querySelector('.min-required');
        const bnbPriceDisplay = document.querySelector('.current-price');
        
        if (minBnbDisplay) {
            minBnbDisplay.textContent = `${minBnbAmount.toFixed(8)} BNB`;
        }
        if (bnbPriceDisplay) {
            bnbPriceDisplay.textContent = `$${currentBnbPrice.toFixed(2)} USD`;
        }
        
        return minBnbAmount;
    } catch (error) {
        console.error('Error fetching BNB price:', error);
        return 0;
    }
}

// Setup event listeners
function setupEventListeners() {
    bnbAmountInput.addEventListener('input', handleBnbInput);
    pinAmountInput.addEventListener('input', handlePinInput);
    buyButton.addEventListener('click', handleBuy);
    connectWalletBtn.addEventListener('click', connectWallet);
    maxBtn.addEventListener('click', handleMaxClick);
}

// Update the BNB input handler to calculate PIN amount in real-time
document.getElementById('bnbAmount').addEventListener('input', function(e) {
    try {
        const bnbAmount = parseFloat(e.target.value) || 0;
        
        // Calculate PIN amount (1 USDT = 1000 PIN, and we use current BNB price)
        const usdValue = bnbAmount * currentBnbPrice;
        const pinAmount = Math.floor(usdValue * 1000); // 1 USDT = 1000 PIN
        
        // Update PIN input
        document.getElementById('pinAmount').value = pinAmount.toString();
        
        // Validate the input
        validateInput();
        
    } catch (error) {
        console.error('Error updating PIN amount:', error);
    }
});

// Update the validateInput function to handle the new calculation
function validateInput() {
    const pinAmount = parseFloat(document.getElementById('pinAmount').value) || 0;
    const bnbAmount = parseFloat(document.getElementById('bnbAmount').value) || 0;
    
    const buyBtn = document.getElementById('buyPin');
    const isValid = pinAmount >= MIN_PIN_AMOUNT && bnbAmount >= minBnbAmount;
    
    buyBtn.disabled = !isValid;
    buyBtn.style.opacity = isValid ? '1' : '0.5';
    
    if (!isValid && pinAmount > 0) {
        buyBtn.title = `Minimum purchase is ${MIN_PIN_AMOUNT.toLocaleString()} PIN (${minBnbAmount.toFixed(8)} BNB)`;
    } else {
        buyBtn.title = '';
    }
}

// Update the calculatePinAmount function to use the current BNB price
function calculatePinAmount(bnbAmount) {
    if (!bnbAmount) return 0;
    const usdValue = bnbAmount * currentBnbPrice;
    return Math.floor(usdValue * 1000); // 1 USDT = 1000 PIN
}

// Handle PIN input
function handlePinInput(e) {
    const pinAmount = parseFloat(e.target.value);
    const bnbAmount = calculateBnbAmount(pinAmount);
    updateBnbAmount(bnbAmount);
    validateInput();
}

// Calculate BNB amount from PIN
function calculateBnbAmount(pinAmount) {
    if (!pinAmount) return 0;
    const usdValue = pinAmount * PIN_PRICE_USD;
    return usdValue / currentBnbPrice;
}

// Update PIN input
function updatePinAmount(amount) {
    pinAmountInput.value = amount ? amount.toFixed(0) : '';
}

// Update BNB input
function updateBnbAmount(amount) {
    bnbAmountInput.value = amount ? amount.toFixed(8) : '';
}

// Update the handleMaxClick function to fill exact balance
async function handleMaxClick() {
    try {
        if (!selectedWallet) {
            showNotification('Please connect wallet first', 'warning');
            return;
        }
    
        // Show loading state
        const maxBtn = document.querySelector('.max-btn');
        maxBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        maxBtn.disabled = true;

        // Get BNB balance
        const web3 = new Web3(window.ethereum);
        const balance = await web3.eth.getBalance(selectedWallet);
        
        // Convert balance from wei to BNB and leave small amount for gas
        const balanceInBNB = web3.utils.fromWei(balance, 'ether');
        const gasBuffer = 0.0005; // Leave 0.0005 BNB for gas
        const usableBalance = Math.max(0, parseFloat(balanceInBNB) - gasBuffer);

        // Update input with exact balance
        const amountInput = document.getElementById('bnbAmount');
        amountInput.value = usableBalance.toFixed(18).replace(/\.?0+$/, ''); // Remove trailing zeros

        // Calculate and update PIN amount
        const usdValue = usableBalance * currentBnbPrice;
        const pinAmount = Math.floor(usdValue * 1000); // 1 USDT = 1000 PIN
        document.getElementById('pinAmount').value = pinAmount.toString();

        // Show balance notification
        showNotification(`Balance: ${usableBalance} BNB`, 'success');

    } catch (error) {
        console.error('Error getting balance:', error);
        showNotification('Error fetching balance', 'error');
    } finally {
        // Reset max button
        const maxBtn = document.querySelector('.max-btn');
        maxBtn.innerHTML = 'MAX';
        maxBtn.disabled = false;
    }
}

// Update getBNBBalance function to return exact balance
async function getBNBBalance() {
    const web3 = new Web3(window.ethereum);
    const balance = await web3.eth.getBalance(selectedWallet);
    const balanceInBNB = web3.utils.fromWei(balance, 'ether');
    return balanceInBNB.toString();
}

// Update PIN amount based on input
function updatePinAmount() {
    const amountInput = document.getElementById('bnbAmount');
    const pinAmountInput = document.getElementById('pinAmount');
    const selectedCurrency = document.querySelector('.payment-btn.active').getAttribute('data-currency');
    
    const amount = parseFloat(amountInput.value) || 0;
    let pinAmount;

    if (selectedCurrency === 'USDT') {
        // 1 USDT = 1000 PIN (since 1 PIN = $0.001)
        pinAmount = amount * 1000;
    } else {
        // Calculate PIN amount based on BNB price
        const bnbPriceText = document.querySelector('.current-price').textContent;
        const bnbPrice = parseFloat(bnbPriceText.replace('$', ''));
        pinAmount = (amount * bnbPrice) / PIN_PRICE_USD;
    }

    pinAmountInput.value = Math.floor(pinAmount);
}

// Add transaction validation
function validateTransaction(amount, currency) {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        throw new Error('Invalid amount');
    }

    const minAmount = currency === 'USDT' ? 10 : minBnbAmount;
    if (parseFloat(amount) < minAmount) {
        throw new Error(`Minimum ${currency} amount is ${minAmount}`);
    }

    const pinAmount = parseFloat(document.getElementById('pinAmount').value);
    if (pinAmount < MIN_PIN_AMOUNT) {
        throw new Error(`Minimum purchase is ${MIN_PIN_AMOUNT} PIN`);
    }
}

// Update handleBuy to use validation
async function handleBuy(e) {
    e.preventDefault();
    
    try {
        // Check if wallet is connected
        if (!selectedWallet) {
            showNotification('Please connect your wallet first', 'error');
            return;
        }

        const amount = document.getElementById('bnbAmount').value;
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            showNotification('Please enter a valid amount', 'error');
            return;
        }

        // Show loading state
        const buyBtn = document.getElementById('buyPin');
        buyBtn.disabled = true;
        buyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

        try {
            const txHash = await handleBNBPayment(selectedWallet, amount);
            
            // Show success message with transaction link
            const bscScanUrl = `https://bscscan.com/tx/${txHash}`;
            showNotification(`
                Transaction successful! 
                <a href="${bscScanUrl}" target="_blank" rel="noopener noreferrer">
                    View on BscScan
                </a>
            `, 'success');

        } catch (error) {
            console.error('Payment Error:', error);
            showNotification(error.message || 'Payment failed. Please try again.', 'error');
        }

    } catch (error) {
        console.error('Buy Error:', error);
        showNotification(error.message || 'An error occurred. Please try again.', 'error');
    } finally {
        // Reset button state
        const buyBtn = document.getElementById('buyPin');
        buyBtn.disabled = false;
        buyBtn.innerHTML = 'Buy PIN Coins';
    }
}

// Update the event listener for the buy button
document.getElementById('buyPin').addEventListener('click', handleBuy);

// Update the handleBNBPayment function for better Trust Wallet compatibility
async function handleBNBPayment(userAddress, amount) {
    try {
        const provider = detectProvider();
        if (!provider) {
            throw new Error('Please install a supported wallet (MetaMask, Trust Wallet, Coinbase Wallet)');
        }
        const web3 = new Web3(provider);
        
        // Convert amount to wei with proper precision
        const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
        
        // Check balance with proper error handling
        const balance = await web3.eth.getBalance(userAddress);
        if (BigInt(balance) < BigInt(amountInWei)) {
            throw new Error('Insufficient BNB balance');
        }

        // Prepare transaction with Trust Wallet optimized parameters
        const transactionParameters = {
            to: PIN_CONTRACT_ADDRESS,
            from: userAddress,
            value: web3.utils.toHex(amountInWei),
            chainId: CONFIG.BSC_CHAIN_ID,
        };

        // Get current gas price with Trust Wallet optimization
        try {
            const currentGasPrice = await web3.eth.getGasPrice();
            // Use slightly higher gas price for faster confirmation
            transactionParameters.gasPrice = web3.utils.toHex(
                Math.floor(Number(currentGasPrice) * CONFIG.GAS_PRICE_MULTIPLIER)
            );
        } catch (error) {
            console.warn('Failed to get gas price, using default');
            transactionParameters.gasPrice = web3.utils.toHex(CONFIG.DEFAULT_GAS_PRICE);
        }

        // Estimate gas with Trust Wallet optimization
        try {
            const gasEstimate = await web3.eth.estimateGas(transactionParameters);
            // Add buffer for Trust Wallet's gas estimation
            transactionParameters.gas = web3.utils.toHex(
                Math.floor(gasEstimate * CONFIG.GAS_LIMIT_MULTIPLIER)
            );
        } catch (error) {
            console.warn('Gas estimation failed, using safe default:', error);
            transactionParameters.gas = web3.utils.toHex(CONFIG.GAS_LIMIT.BNB);
        }

        // Add Trust Wallet specific parameters
        if (provider.isTrust) {
            transactionParameters.gasLimit = transactionParameters.gas;
            // Add data parameter for better Trust Wallet compatibility
            transactionParameters.data = '0x';
        }

        // Handle transaction with Trust Wallet optimization
        let txHash;
        try {
            if (provider.isTrust) {
                // Trust Wallet specific transaction handling
                txHash = await new Promise((resolve, reject) => {
                    provider.request({
                        method: 'eth_sendTransaction',
                        params: [transactionParameters],
                    })
                    .then(hash => {
                        // Start monitoring immediately after getting hash
                        resolve(hash);
                        showNotification('Transaction submitted. Awaiting confirmation...', 'info');
                    })
                    .catch(error => {
                        if (error.code === 4001) {
                            reject(new Error('Transaction rejected by user'));
                        } else {
                            reject(error);
                        }
                    });
                });
            } else {
                // Handle other wallets
                txHash = await provider.request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters]
                });
            }

            // Enhanced transaction monitoring for Trust Wallet
            const receipt = await monitorTrustWalletTransaction(web3, txHash);
            if (receipt && receipt.status) {
                return txHash;
            } else {
                throw new Error('Transaction failed. Please try again.');
            }
        } catch (error) {
            handleTransactionError(error);
        }
    } catch (error) {
        console.error('Payment Error:', error);
        throw error;
    }
}

// Add Trust Wallet specific transaction monitoring
async function monitorTrustWalletTransaction(web3, txHash) {
    const maxAttempts = CONFIG.RETRY_ATTEMPTS;
    const checkInterval = 2000; // 2 seconds
    
    return new Promise((resolve, reject) => {
        let attempts = 0;
        
        const checkTransaction = async () => {
            try {
                const receipt = await web3.eth.getTransactionReceipt(txHash);
                
                if (receipt) {
                    if (receipt.status) {
                        showNotification('Transaction confirmed!', 'success');
                        resolve(receipt);
                    } else {
                        reject(new Error('Transaction failed'));
                    }
                    return;
                }
                
                if (attempts >= maxAttempts) {
                    // Try alternative RPC endpoints
                    for (const rpcUrl of CONFIG.RPC_ENDPOINTS) {
                        try {
                            const altWeb3 = new Web3(rpcUrl);
                            const altReceipt = await altWeb3.eth.getTransactionReceipt(txHash);
                            if (altReceipt) {
                                resolve(altReceipt);
                                return;
                            }
                        } catch (error) {
                            console.warn(`Failed to check receipt on ${rpcUrl}:`, error);
                        }
                    }
                    reject(new Error('Transaction confirmation timeout'));
                } else {
                    attempts++;
                    setTimeout(checkTransaction, checkInterval);
                }
            } catch (error) {
                if (attempts >= maxAttempts) {
                    reject(error);
                } else {
                    attempts++;
                    setTimeout(checkTransaction, checkInterval);
                }
            }
        };
        
        checkTransaction();
    });
}

// Add Trust Wallet specific error handling
function handleTransactionError(error) {
    if (error.code === 4001) {
        throw new Error('Transaction rejected by user');
    } else if (error.code === -32603) {
        throw new Error('Please try again with a higher gas price');
    } else if (error.message.includes('insufficient funds')) {
        throw new Error('Insufficient BNB for transaction and gas fees');
    } else if (error.message.includes('replacement transaction underpriced')) {
        throw new Error('Please wait for your previous transaction to complete');
    } else {
        throw new Error(error.message || 'Transaction failed. Please try again.');
    }
}

// Add initialization check
async function checkInitialization() {
    const elements = initializeDOMElements();
    if (!elements) return false;

    const networkOk = await checkNetwork();
    if (!networkOk) {
        showNotification('Network connection issues detected', 'error');
        return false;
    }

    return true;
}

// Update DOMContentLoaded event
document.addEventListener('DOMContentLoaded', async function() {
    if (!await checkInitialization()) {
        showNotification('Failed to initialize application', 'error');
        return;
    }

    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
    }

    initializePaymentButtons();
    
    if (document.querySelector('.payment-btn.active')?.getAttribute('data-currency') === 'BNB') {
        await fetchBNBPrice();
    }
});

// Update the payment button click handler
function initializePaymentButtons() {
    const paymentButtons = document.querySelectorAll('.payment-btn');
    
    paymentButtons.forEach(btn => {
        btn.addEventListener('click', async function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Check if wallet is connected
            if (!selectedWallet) {
                showNotification('Please connect your wallet first', 'warning');
                return;
            }

            // Remove active class from all buttons
            paymentButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const currency = this.getAttribute('data-currency');
            await updatePaymentDisplay(currency);
        });
    });
}

// Separate function to update payment display
async function updatePaymentDisplay(currency) {
    const currencyLabel = document.querySelector('.currency-label');
    const amountInput = document.getElementById('bnbAmount');
    const pinAmountInput = document.getElementById('pinAmount');
    const dynamicCurrencyLabel = document.querySelector('.dynamic-currency-label');
    const dynamicPriceLabel = document.querySelector('.dynamic-price-label');
    const minRequired = document.querySelector('.min-required');
    const currentPrice = document.querySelector('.current-price');
    
    try {
        // Update labels
        currencyLabel.textContent = currency;
        amountInput.placeholder = `Enter ${currency} amount`;

        // Show max button
        const maxBtn = document.querySelector('.max-btn');
        maxBtn.style.display = 'block';
        maxBtn.title = `Click to use maximum ${currency} balance`;

        if (currency === 'USDT') {
            dynamicCurrencyLabel.textContent = 'Min USDT Required:';
            dynamicPriceLabel.textContent = 'Current USDT Price:';
            minRequired.textContent = '10.00 USDT';
            currentPrice.textContent = '$1.00 USD';
            
            if (!amountInput.value) {
                amountInput.value = '10.00';
                pinAmountInput.value = '10000';
            }
        } else {
            dynamicCurrencyLabel.textContent = 'Min BNB Required:';
            dynamicPriceLabel.textContent = 'Current BNB Price:';
            
            const bnbPrice = await fetchBNBPrice();
            // Calculate minimum BNB required for 10,000 PIN
            // 10,000 PIN * $0.001 (PIN price) = $10 USD worth of BNB
            const minBnbRequired = (10 / bnbPrice).toFixed(8);
            
            minRequired.textContent = `${minBnbRequired} BNB`;
            currentPrice.textContent = `$${bnbPrice.toFixed(2)} USD`;
            
            // Set the minimum BNB amount in the input
            if (!amountInput.value) {
                amountInput.value = minBnbRequired;
                pinAmountInput.value = '10000';
            }

            // Store the current BNB price globally
            currentBnbPrice = bnbPrice;
            minBnbAmount = parseFloat(minBnbRequired);
        }

        updatePinAmount();
    } catch (error) {
        console.error('Error updating payment display:', error);
        showNotification('Error updating payment details', 'error');
    }
}

// Update the fetchBNBPrice function
async function fetchBNBPrice(retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return parseFloat(data.price);
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}

// Add MAX button functionality
document.querySelector('.max-btn').addEventListener('click', async function() {
    try {
        const selectedCurrency = document.querySelector('.payment-btn.active').getAttribute('data-currency');
        const amountInput = document.getElementById('bnbAmount');
        
        if (selectedCurrency === 'USDT') {
            const balance = await getUSDTBalance();
            amountInput.value = balance;
        } else {
            const balance = await getBNBBalance();
            // Leave some BNB for gas
            const usableBalance = Math.max(0, parseFloat(balance) - 0.01);
            amountInput.value = usableBalance.toFixed(8);
        }
        
        updatePinAmount();
    } catch (error) {
        console.error('Error setting max amount:', error);
        showNotification('Error getting balance', 'error');
    }
});

// Add notification function if not already present
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Add wallet connect button event listener
document.getElementById('connectWallet').addEventListener('click', connectWallet);

// Add safety checks for DOM elements
function initializeDOMElements() {
    try {
        const requiredElements = {
            'bnbAmount': document.getElementById('bnbAmount'),
            'pinAmount': document.getElementById('pinAmount'),
            'buyPin': document.getElementById('buyPin'),
            'connectWallet': document.getElementById('connectWallet'),
            'maxBtn': document.querySelector('.max-btn')
        };

        for (const [key, element] of Object.entries(requiredElements)) {
            if (!element) {
                throw new Error(`Required element ${key} not found`);
            }
        }

        return requiredElements;
    } catch (error) {
        console.error('Error initializing DOM elements:', error);
        showNotification('Error initializing application', 'error');
        return null;
    }
}

// Add network status check
async function checkNetwork() {
    try {
        const response = await fetch('https://bsc-dataseed1.binance.org', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'net_version',
                params: [],
                id: 1
            })
        });
        return response.ok;
    } catch (error) {
        return false;
    }
} 