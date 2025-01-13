""" 
Main functions to log information
"""

import logging
import pathlib


LOG_DIR = pathlib.Path(__file__).parent.parent.parent.joinpath('logs')
LOG_DIR.mkdir(exist_ok=True)


LOG_FILE_NAME = 'vlib.log'
LOG_FILE = LOG_DIR.joinpath(LOG_FILE_NAME)


logging.basicConfig(
    filename=LOG_FILE, filemode='a',
    encoding='utf-8', level=logging.INFO,
    format="[%(asctime)s - %(levelname)s] %(message)s"
)


def log_info(message: str) -> None:
    """
    Log an information message.

    Args:
    message (str): The message to log.

    Returns: None
    """
    logging.info(message)
    
    
def log_error(message: str) -> None:
    """
    Log an error message.

    Args:
    message (str): The message to log.

    Returns: None
    """
    logging.error(message)
    